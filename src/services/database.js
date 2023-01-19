import * as SQLite from "expo-sqlite";
import { REACT_APP_DBNAME } from "@env";
import { channelsFromUrl } from "./playlist-service";

const db = SQLite.openDatabase(REACT_APP_DBNAME);

const initialize = async () => {
  return new Promise(async (resolve, reject) => {
    db.transaction(
      async (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS " +
            "Playlists " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, url TEXT, numChannels INTEGER)",
          null,
          null,
          (_, error) => {
            console.log("Error on create Playlists table", error);
            reject(error);
          }
        );

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS " +
            "Favorites " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, url TEXT, category TEXT, logo TEXT)",
          null,
          null,
          (_, error) => {
            console.log("Error on create Favorites table", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        resolve();
      }
    );
  });
};

const mapResults = (results) => {
  const records = [];
  const len = results.rows.length;
  if (len > 0) {
    for (let i = 0; i < len; i++) {
      records.push(results.rows.item(i));
    }
  }
  return records;
};

const getRecords = async (table, fieldList = null) => {
  const commandFields = fieldList ? fieldList.join() : "*";
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ${commandFields} FROM ${table}`,
        [],
        (_, results) => {
          resolve(mapResults(results));
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

const filterRecords = async (table, field, value) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${table} WHERE ${field} = ?`,
        [value],
        (_, results) => {
          resolve(mapResults(results));
        },
        reject
      );
    });
  });
};

const addRecord = async (table, valuesObj) => {
  const commandFields = [];
  const values = [];
  let commandValues = "";
  for (const field in valuesObj) {
    if (Object.hasOwnProperty.call(valuesObj, field)) {
      commandFields.push(field);
      values.push(valuesObj[field]);
      commandValues += "?,";
    }
  }
  commandValues = commandValues.slice(0, -1);

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${table} (${commandFields.join()}) VALUES (${commandValues})`,
        values,
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

const deleteRecord = async (table, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${table} WHERE id = ?`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

export const getPlaylists = async () => {
  try {
    await initialize();
    const response = await getRecords("Playlists");

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      errorMessage: "Ocurrió un error.",
    };
  }
};

export const addPlaylist = async (name, url) => {
  try {
    await initialize();

    const channels = await channelsFromUrl(url);

    if (!channels)
      return {
        success: false,
        errorMessage: "Error al guardar lista de reproducción",
        error: "No se pudo cargar algún canal de la url especificada",
      };

    const channelsLength = channels.length;
    const response = await addRecord("Playlists", {
      name: name,
      url: url,
      numChannels: channelsLength,
    });

    // {"insertId": 1, "rows": {"_array": [], "length": 0}, "rowsAffected": 1}
    if (response.rowsAffected === 0) {
      return {
        success: false,
        errorMessage: "Error al guardar lista de reproducción",
        error: "No se guardó la lista de reproducción",
      };
    }

    return {
      success: true,
      data: { id: response.insertId, numChannels: channelsLength, name, url },
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      errorMessage: "Ocurrió un error.",
    };
  }
};

export const deletePlaylists = async (id) => {
  try {
    await initialize();
    const response = await deleteRecord("Playlists", id);

    // {"insertId": undefined, "rows": {"_array": [], "length": 0}, "rowsAffected": 1}
    if (response.rowsAffected === 0) {
      return {
        success: false,
        errorMessage: "Error al eliminar lista de reproducción",
        error: "",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      errorMessage: "Ocurrió un error.",
    };
  }
};

export const getFavorites = async () => {
  try {
    await initialize();
    const response = await getRecords("Favorites");

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      errorMessage: "Ocurrió un error.",
    };
  }
};

export const getFavoriteByName = async (name) => {
  try {
    await initialize();
    const response = await filterRecords("Favorites", "name", name);
    const [firstItem = null] = response;

    return {
      success: true,
      data: firstItem,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      errorMessage: "Ocurrió un error.",
    };
  }
};

export const saveFavorite = async (item) => {
  try {
    await initialize();

    // (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, url TEXT, category TEXT, logo TEXT)
    const dataObj = {
      name: item.name,
      url: item.url,
      category: item.category,
      logo: item.logo,
    };
    const response = await addRecord("Favorites", dataObj);

    if (response.rowsAffected === 0) {
      return {
        success: false,
        errorMessage: "Error al guardar canal a Favoritos",
        error: "No se guardó el canal",
      };
    }

    dataObj.id = response.insertId;

    return {
      success: true,
      data: dataObj,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      errorMessage: "Ocurrió un error.",
    };
  }
};

export const deleteFavorite = async (id) => {
  try {
    await initialize();
    const response = await deleteRecord("Favorites", id);

    if (response.rowsAffected === 0) {
      return {
        success: false,
        errorMessage: "Error al eliminar lista de reproducción",
        error: "",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      errorMessage: "Ocurrió un error.",
    };
  }
};

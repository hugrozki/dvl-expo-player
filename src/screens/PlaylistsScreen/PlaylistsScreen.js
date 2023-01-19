import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import Toast from "react-native-root-toast";

import { NoContentView } from "../../components/shared";
import { getPlaylists } from "../../services/database";
import { PlaylistItem } from "./PlaylistItem";

export function PlaylistsScreen({ route, navigation }) {
  const [playlists, setPlaylists] = useState([]);
  const playlistId = route.params?.itemId;

  useEffect(() => {
    (async () => {
      const response = await getPlaylists();

      if (!response.success) {
        Toast.show(`${response.errorMessage}: ${response.error}`, {
          duration: Toast.durations.LONG,
        });
      } else {
        setPlaylists(response.data);
      }
    })();
  }, [playlistId]);

  const onDelete = (id) => {
    const itemIndex = playlists.findIndex((item) => item.id === id);
    const tmp = playlists.slice();

    tmp.splice(itemIndex, 1);
    setPlaylists(tmp);
  };

  if (playlists.length === 0)
    return <NoContentView text="No hay listas de reproducción." />;

  return (
    <FlatList
      data={playlists}
      renderItem={({ item }) => (
        <PlaylistItem item={item} navigation={navigation} onDelete={onDelete} />
      )}
    />
  );
}

import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { NoContentView } from "../../components/shared";
import { getFavorites } from "../../services/database";
import { ChannelItem } from "./ChannelItem";

export function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      (async () => {
        const response = await getFavorites();

        if (isActive) {
          if (!response.success) {
            Toast.show(`${response.errorMessage}: ${response.error}`, {
              duration: Toast.durations.LONG,
            });
          } else {
            setFavorites(response.data);
          }
        }
      })();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const onDelete = (id) => {
    const itemIndex = favorites.findIndex((item) => item.id === id);
    const tmp = favorites.slice();

    tmp.splice(itemIndex, 1);
    setFavorites(tmp);
  };

  if (favorites.length === 0)
    return <NoContentView text="Aún no hay canales guardados." />;

  return (
    <FlatList
      data={favorites}
      renderItem={({ item }) => (
        <ChannelItem item={item} navigation={navigation} onDelete={onDelete} />
      )}
    />
  );
}

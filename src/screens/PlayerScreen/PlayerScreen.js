import { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Card, Icon } from "@rneui/themed";

import { Player } from "../../components/player";
import { styles } from "./PlayerScreen.styles";
import {
  getFavoriteByName,
  saveFavorite,
  deleteFavorite,
} from "../../services/database";

export function PlayerScreen({ route }) {
  const { name, url, group, logo } = route.params;
  const [favorite, setFavorite] = useState(null);

  const toggleFavorite = async () => {
    if (favorite !== null) {
      const response = await deleteFavorite(favorite.id);

      if (response.success) {
        setFavorite(null);
      }
    } else {
      const response = await saveFavorite({
        name,
        url,
        category: group,
        logo,
      });

      if (response.success) {
        setFavorite(response.data);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getFavoriteByName(name);
      setFavorite(response.data);
    })();
  }, [name]);

  return (
    <View>
      <Player url={url} />
      <Card>
        <View style={styles.container}>
          <Text>Categoría: {group}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Icon
              type="material-community"
              name={favorite !== null ? "heart" : "heart-outline"}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}

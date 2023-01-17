import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Card, Icon } from "@rneui/themed";

import { Player } from "../../components/player";
import { styles } from "./PlayerScreen.styles";

export function PlayerScreen({ route }) {
  const { id, name, url, group, logo, favoriteId } = route.params;
  const [favorite, setFavorite] = useState(favoriteId !== null);

  const saveInFavorite = () => {
    setFavorite((prevState) => !prevState);
  };

  return (
    <View>
      <Player url={url} />
      <Card>
        <View style={styles.container}>
          <Text>Categoría: {group}</Text>
          <TouchableOpacity onPress={saveInFavorite}>
            <Icon
              type="material-community"
              name={favorite ? "heart" : "heart-outline"}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}

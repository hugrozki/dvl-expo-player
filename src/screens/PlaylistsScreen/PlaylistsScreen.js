import React from "react";
import {
  FlatList,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { ListItem } from "@rneui/themed";

const DATA = [
  {
    id: 1,
    name: "México",
    url: "https://iptv-org.github.io/iptv/countries/mx.m3u",
  },
];

const PlayListItem = ({ item }) => (
  <TouchableHighlight key={item.id} onPress={() => console.log(item)}>
    <ListItem>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  </TouchableHighlight>
);

export function PlaylistsScreen({ navigation }) {
  if (DATA.length === 0)
    return (
      <View style={styles.emptyContainer}>
        <Text>No hay listas de reproducción.</Text>
      </View>
    );

  return (
    <FlatList
      style={styles.container}
      data={DATA}
      renderItem={({ item }) => <PlayListItem item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

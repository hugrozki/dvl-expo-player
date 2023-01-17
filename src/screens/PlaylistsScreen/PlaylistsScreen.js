import React from "react";
import { FlatList } from "react-native";
import { ListItem } from "@rneui/themed";

import {
  SwipeableListItem,
  DeleteItemButton,
  NoContentView,
} from "../../components/shared";
import { screens } from "../../utils/screenNames";

const DATA = [
  {
    id: 1,
    name: "México",
    url: "https://iptv-org.github.io/iptv/countries/mx.m3u",
    numChannels: 2,
  },
  {
    id: 2,
    name: "Inglés",
    url: "https://iptv-org.github.io/iptv/languages/eng.m3u",
    numChannels: 2,
  },
];

const PlayListItem = ({ item, navigation }) => {
  const deleteItem = (reset) => {
    console.log("Delete item", item);
    reset();
  };

  const gotoPlaylist = () => {
    navigation.navigate(screens.playlist.playlist.name, {
      itemName: item.name,
      itemUrl: item.url,
    });
  };

  return (
    <SwipeableListItem
      itemId={item.id}
      onPress={gotoPlaylist}
      rightContent={(reset) => (
        <DeleteItemButton onPress={() => deleteItem(reset)} />
      )}
    >
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.numChannels} Canales</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </SwipeableListItem>
  );
};

export function PlaylistsScreen({ navigation }) {
  if (DATA.length === 0)
    return <NoContentView text="No hay listas de reproducción." />;

  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <PlayListItem item={item} navigation={navigation} />
      )}
    />
  );
}

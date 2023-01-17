import React from "react";
import { FlatList } from "react-native";
import { Avatar, ListItem } from "@rneui/themed";

import {
  SwipeableListItem,
  DeleteItemButton,
  NoContentView,
} from "../../components/shared";
import { screens } from "../../utils/screenNames";

const DATA = [
  {
    id: 1,
    name: "ADN 40 (480p)",
    url: "https://mdstrm.com/live-stream-playlist/60b578b060947317de7b57ac.m3u8",
    group: "News",
    logo: "https://i.imgur.com/Og17U9N.png",
    favoriteId: 1,
  },
  {
    id: 2,
    name: "Baby TV (480p)",
    url: "http://okkotv-live.cdnvideo.ru/channel/BabyTV.m3u8",
    group: "Kids",
    logo: "https://i.imgur.com/fvVovnc.png",
    favoriteId: null,
  },
];

const ChannelItem = ({ item, navigation }) => {
  const deleteItem = (reset) => {
    console.log("Delete item", item);
    reset();
  };

  const gotoPlayer = () => {
    navigation.navigate(screens.playlist.player.name, item);
  };

  return (
    <SwipeableListItem
      itemId={item.id}
      onPress={gotoPlayer}
      rightContent={(reset) => (
        <DeleteItemButton onPress={() => deleteItem(reset)} />
      )}
    >
      <Avatar
        size={64}
        rounded
        source={{ uri: item.logo }}
        imageProps={{
          resizeMode: "contain",
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.group}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </SwipeableListItem>
  );
};

export function FavoritesScreen({ navigation }) {
  if (DATA.length === 0)
    return <NoContentView text="Aún no hay canales guardados." />;

  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <ChannelItem item={item} navigation={navigation} />
      )}
    />
  );
}

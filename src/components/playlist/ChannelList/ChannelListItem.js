import React from "react";
import { ListItem, Avatar } from "@rneui/themed";

import { screens } from "../../../utils/screenNames";

export function ChannelListItem({ item, navigation }) {
  const gotoPlayer = () => {
    navigation.navigate(screens.playlist.player.name, item);
  };

  return (
    <ListItem key={item.id} onPress={gotoPlayer} bottomDivider>
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
    </ListItem>
  );
}

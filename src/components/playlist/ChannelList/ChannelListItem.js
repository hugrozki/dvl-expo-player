import React from "react";
import { ListItem, Avatar, useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import { screens } from "../../../utils/screenNames";

const ChannelListItem = React.memo(function ChannelListItem({
  id,
  name,
  url,
  group,
  logo,
}) {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const gotoPlayer = () => {
    navigation.navigate(screens.playlist.player.name, {
      id,
      name,
      url,
      group,
      logo,
    });
  };

  return (
    <ListItem onPress={gotoPlayer} bottomDivider>
      {logo ? (
        <Avatar
          size={64}
          rounded
          source={{ uri: logo }}
          imageProps={{
            resizeMode: "contain",
          }}
        />
      ) : (
        <Avatar
          size={64}
          rounded
          title="A"
          containerStyle={{ backgroundColor: theme.colors.greyOutline }}
        />
      )}
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>{group}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
});

export default ChannelListItem;

import { Avatar, ListItem } from "@rneui/themed";
import Toast from "react-native-root-toast";

import { screens } from ".././../utils/screenNames";
import { SwipeableListItem, DeleteItemButton } from "../../components/shared";
import { deleteFavorite } from "../../services/database";

export function ChannelItem({ item, navigation, onDelete }) {
  const deleteItem = async (reset) => {
    reset();

    const response = await deleteFavorite(item.id);

    if (!response.success) {
      Toast.show(`${response.errorMessage}: ${response.error}`, {
        duration: Toast.durations.LONG,
      });
    } else {
      if (typeof onDelete === "function") {
        onDelete(item.id);
      }
    }
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
      {item.logo ? (
        <Avatar
          size={64}
          rounded
          source={{ uri: item.logo }}
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
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.group}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </SwipeableListItem>
  );
}

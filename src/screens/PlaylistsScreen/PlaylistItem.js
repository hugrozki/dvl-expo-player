import { ListItem } from "@rneui/themed";
import Toast from "react-native-root-toast";

import { screens } from ".././../utils/screenNames";
import { SwipeableListItem, DeleteItemButton } from "../../components/shared";
import { deletePlaylists } from "../../services/database";

export function PlaylistItem({ item, navigation, onDelete }) {
  const deleteItem = async (reset) => {
    reset();

    const response = await deletePlaylists(item.id);

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
}

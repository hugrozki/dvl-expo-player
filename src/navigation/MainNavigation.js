import { TouchableHighlight } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";

import { PlaylistsScreen } from "../screens/PlaylistsScreen/PlaylistsScreen";
import { AddPlaylistScreen } from "../screens/AddPlaylistScreen/AddPlaylistScreen";
import { screens } from "../utils/screenNames";
import { HeaderButton } from "../components/shared";

const Stack = createNativeStackNavigator();

export function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.playlist.playlists.name}
        component={PlaylistsScreen}
        options={({ navigation }) => ({
          title: screens.playlist.playlists.title,
          headerRight: () => (
            <HeaderButton
              iconName="plus-thick"
              screenName={screens.playlist.addPlaylist.name}
            />
          ),
        })}
      />
      <Stack.Screen
        name={screens.playlist.addPlaylist.name}
        component={AddPlaylistScreen}
        options={{
          title: screens.playlist.addPlaylist.title,
        }}
      />
    </Stack.Navigator>
  );
}

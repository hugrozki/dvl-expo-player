import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";

import { PlaylistsScreen } from "../screens/PlaylistsScreen/PlaylistsScreen";
import { AddPlaylistScreen } from "../screens/AddPlaylistScreen/AddPlaylistScreen";
import { PlaylistDetailScreen } from "../screens/PlaylistDetailScreen/PlaylistDetailScreen";
import { PlayerScreen } from "../screens/PlayerScreen/PlayerScreen";

import { screens } from "../utils/screenNames";
import { HeaderButton } from "../components/shared";

const Stack = createNativeStackNavigator();

export function PlaylistNavigation() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.black,
        },
        headerTintColor: theme.colors.white,
        headerBackTitleVisible: false,
      }}
    >
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
      <Stack.Screen
        name={screens.playlist.playlist.name}
        component={PlaylistDetailScreen}
        options={({ route }) => ({
          title: `Canales en ${route.params.itemName}`,
        })}
      />
      <Stack.Screen
        name={screens.playlist.player.name}
        component={PlayerScreen}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  );
}

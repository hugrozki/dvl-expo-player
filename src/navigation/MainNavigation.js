import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "@rneui/themed";

import { PlaylistNavigation } from "./PlaylistNavigation";
import { FavoritesScreen } from "../screens/FavoritesScreen/FavoritesScreen";
import { screens } from "../utils/screenNames";

const Tab = createBottomTabNavigator();

export function MainNavigation() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => tabBarIcon(route, color, size),
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerBackTitleVisible: false,
      })}
    >
      <Tab.Screen
        name={screens.playlist.playlists.title}
        component={PlaylistNavigation}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={screens.favorites.favorites.title}
        component={FavoritesScreen}
      />
    </Tab.Navigator>
  );
}

function tabBarIcon(route, color, size) {
  return (
    <Icon
      type="material-community"
      name={
        route.name === screens.playlist.playlists.title
          ? "playlist-play"
          : "heart"
      }
      color={color}
      size={size}
    />
  );
}

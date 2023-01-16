import { NavigationContainer } from "@react-navigation/native";

import { PlaylistsScreen } from "./src/screens/PlaylistsScreen/PlaylistsScreen";
import { MainNavigation } from "./src/navigation/MainNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}

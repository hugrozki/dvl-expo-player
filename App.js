import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@rneui/themed";
import { RootSiblingParent } from "react-native-root-siblings";

import { MainNavigation } from "./src/navigation/MainNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <RootSiblingParent>
          <MainNavigation />
        </RootSiblingParent>
      </ThemeProvider>
    </NavigationContainer>
  );
}

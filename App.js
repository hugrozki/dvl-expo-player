import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@rneui/themed";

import { MainNavigation } from "./src/navigation/MainNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <MainNavigation />
      </ThemeProvider>
    </NavigationContainer>
  );
}

import { TouchableOpacity } from "react-native";
import { Icon, useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export function HeaderButton({ screenName, iconName }) {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const pressHandler = () => {
    navigation.navigate(screenName);
  };
  return (
    <TouchableOpacity onPress={pressHandler}>
      <Icon
        type="material-community"
        name={iconName}
        color={theme.colors.white}
      />
    </TouchableOpacity>
  );
}

import { TouchableHighlight } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export function HeaderButton({ screenName, iconName }) {
  const navigation = useNavigation();

  const pressHandler = () => {
    console.log(`go to ${screenName}`);
    navigation.navigate(screenName);
  };
  return (
    <TouchableHighlight onPress={pressHandler}>
      <Icon type="material-community" name={iconName} />
    </TouchableHighlight>
  );
}

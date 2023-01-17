import { View, Text } from "react-native";

import { styles } from "./NoContentView.styles";

export function NoContentView({ text }) {
  return (
    <View style={styles.emptyContainer}>
      <Text>{text}</Text>
    </View>
  );
}

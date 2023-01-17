import React from "react";
import { View, Text } from "react-native";

import { Button, useTheme } from "@rneui/themed";

export function DeleteItemButton({ onPress }) {
  const { theme } = useTheme();
  return (
    <Button
      title="Eliminar"
      icon={{ name: "delete", color: theme.colors.white }}
      buttonStyle={{
        minHeight: "100%",
        backgroundColor: theme.colors.error,
      }}
      onPress={onPress}
    />
  );
}

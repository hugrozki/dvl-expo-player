import React from "react";
import { ListItem } from "@rneui/themed";

export function SwipeableListItem({ itemId, onPress, rightContent, children }) {
  return (
    <ListItem.Swipeable
      key={itemId}
      rightContent={rightContent}
      onPress={onPress}
      bottomDivider
    >
      {children}
    </ListItem.Swipeable>
  );
}

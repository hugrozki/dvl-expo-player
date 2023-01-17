import React from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import { View, Button } from "react-native";

import { styles } from "./Player.styles";

export function Player({ url }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: url }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onError={(error) => {
          console.log(error);
        }}
      />
    </View>
  );
}

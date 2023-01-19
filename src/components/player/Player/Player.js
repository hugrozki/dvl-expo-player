import React from "react";
import { Video } from "expo-av";
import { View } from "react-native";
import Toast from "react-native-root-toast";

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
          Toast.show(`Error al reproducir el canal: ${error}`, {
            duration: Toast.durations.LONG,
          });
        }}
      />
    </View>
  );
}

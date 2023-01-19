import { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";

import { screens } from "../../utils/screenNames";
import { styles } from "./AddPlaylistScreen.styles";
import { initialValues, AddPlaylistSchema } from "./AddPlaylistScreen.data";
import { addPlaylist } from "../../services/database";

export function AddPlaylistScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AddPlaylistSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const response = await addPlaylist(values.name, values.url);

      if (!response.success) {
        setLoading(false);
        Toast.show(`${response.errorMessage}: ${response.error}`, {
          duration: Toast.durations.LONG,
        });
      } else {
        navigation.navigate(screens.playlist.playlists.name, {
          itemId: response.data.id,
        });
      }
    },
  });

  return (
    <View style={styles.container}>
      <Input
        placeholder="Introduzca nombre"
        onChangeText={formik.handleChange("name")}
        value={formik.values.name}
        errorMessage={formik.errors.name}
      />
      <Input
        placeholder="Introduzca url"
        onChangeText={formik.handleChange("url")}
        value={formik.values.url}
        keyboardType="url"
        errorMessage={formik.errors.url}
      />
      <Button
        title="Guardar"
        type="outline"
        style={styles.button}
        onPress={formik.handleSubmit}
        loading={loading}
      />
    </View>
  );
}

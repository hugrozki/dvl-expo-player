import React from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";

import { screens } from "../../utils/screenNames";
import { styles } from "./AddPlaylistScreen.styles";
import { initialValues, AddPlaylistSchema } from "./AddPlaylistScreen.data";

export function AddPlaylistScreen({ navigation }) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AddPlaylistSchema,
    onSubmit: (values) => {
      console.log(values);
      navigation.navigate(screens.playlist.playlists.name, {
        itemId: 999,
      });
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
      />
    </View>
  );
}

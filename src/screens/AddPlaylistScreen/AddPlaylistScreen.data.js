import * as Yup from "yup";

export const initialValues = {
  name: "",
  url: "",
};

export const AddPlaylistSchema = Yup.object().shape({
  name: Yup.string()
    .max(30, "Máximo 30 caracteres.")
    .required("Nombre es requerido."),
  url: Yup.string().required("Url es requerido."),
});

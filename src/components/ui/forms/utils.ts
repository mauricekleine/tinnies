import { FieldMetaProps } from "formik";

export const hasError = <T>(meta: FieldMetaProps<T>) =>
  meta.error && meta.touched;

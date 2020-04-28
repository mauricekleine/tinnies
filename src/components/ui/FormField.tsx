import { useField } from "formik";
import React, { ReactNode } from "react";
import { useDropzone } from "react-dropzone";

import { ALLOWED_IMAGE_TYPES } from "../../utils/imageConfig";

import colors from "./colors";

type FormFieldProps = {
  label: string;
  name: string;
  type: string;
};

type FormErrorProps = {
  children: ReactNode;
};

const FormError = ({ children }: FormErrorProps) => (
  <div className={`italic px-1 text-${colors.red} text-xs`}>{children}</div>
);

const FormField = ({ label, name, type }: FormFieldProps) => {
  const [field, meta] = useField<string>({ name, type });

  return (
    <div className="mb-4">
      <FormLabel>{label}</FormLabel>

      <input
        className={`appearance-none border border-b-2 border-r-2 border-${
          meta.touched && meta.error ? colors.red : colors.grayLight
        } px-3 py-2 rounded text-${colors.gray} w-full focus:border-${
          colors.primary
        } focus:outline-none`}
        name={name}
        placeholder={label}
        type={type}
        {...field}
      />

      {meta.touched && meta.error && <FormError>{meta.error}</FormError>}
    </div>
  );
};

type ImageFieldProps = {
  label: FormFieldProps["label"];
  name: FormFieldProps["name"];
};

export const ImageField = ({ label, name }: ImageFieldProps) => {
  const [field, meta, helpers] = useField<File>({ name, type: "file" });
  const { acceptedFiles, getInputProps, getRootProps } = useDropzone({
    accept: ALLOWED_IMAGE_TYPES.join(", "),
    multiple: false,
    onDrop: (values) => helpers.setValue(values[0]),
  });

  const file = acceptedFiles[0];

  return (
    <div className="mb-4">
      <FormLabel>{label}</FormLabel>

      <div
        {...getRootProps({
          className: `border border-b-2 border-r-2 border-${
            meta.touched && meta.error ? colors.red : colors.grayLight
          } cursor-pointer flex flex-col h-64 items-center justify-center p-4 overflow-hidden rounded text-center focus:border-${
            colors.primary
          } focus:outline-none`,
        })}
      >
        <input name={name} {...getInputProps()} />

        {file ? (
          <>
            <img className="h-full rounded" src={URL.createObjectURL(file)} />
          </>
        ) : (
          <>
            <span>Click to select files</span>
            <span className={`text-${colors.gray} text-xs`}>
              Only *.jpeg and *.png images will be accepted
            </span>
          </>
        )}
      </div>

      {meta.touched && meta.error && <FormError>{meta.error}</FormError>}
    </div>
  );
};

type FormLabelProps = {
  children: ReactNode;
};

export const FormLabel = ({ children }: FormLabelProps) => (
  <label className={`block font-semibold mb-1 text-${colors.gray}`}>
    {children}
  </label>
);

export default FormField;

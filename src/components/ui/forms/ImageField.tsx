import { useField } from "formik";
import React from "react";
import { useDropzone } from "react-dropzone";

import { ALLOWED_IMAGE_TYPES } from "../../../utils/imageConfig";
import colors from "../colors";

import FormGroup from "./FormGroup";
import { hasError } from "./utils";

type ImageFieldProps = {
  label: string;
  name: string;
};

const ImageField = ({ label, name }: ImageFieldProps) => {
  const [field, meta, helpers] = useField<File>({ name, type: "file" });
  const hasFieldError = hasError<File>(meta);

  const { acceptedFiles, getInputProps, getRootProps } = useDropzone({
    accept: ALLOWED_IMAGE_TYPES.join(", "),
    multiple: false,
    onDrop: (values) => helpers.setValue(values[0]),
  });

  const file = acceptedFiles[0];

  return (
    <FormGroup error={meta.error} hasError={hasFieldError} label={label}>
      <div
        {...getRootProps({
          className: `border border-b-2 border-${
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
    </FormGroup>
  );
};

export default ImageField;

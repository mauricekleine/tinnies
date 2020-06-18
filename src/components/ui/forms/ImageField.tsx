import classNames from "classnames";
import { useField } from "formik";
import React from "react";
import { useDropzone } from "react-dropzone";

import { ALLOWED_IMAGE_TYPES } from "../../../utils/imageConfig";
import Theme from "../theme";
import { FinePrint } from "../typography";

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
    <Theme>
      {({ colors }) => (
        <FormGroup
          error={meta.error}
          hasError={hasFieldError}
          label={label}
          labelFor={name}
        >
          <div
            {...getRootProps({
              className: classNames(
                "border border-b-2",
                {
                  [`border-${colors.red}`]: hasFieldError,
                  [`border-${colors.grayLight}`]: !hasFieldError,
                },
                "cursor-pointer flex flex-col h-64 items-center justify-center p-4 overflow-hidden rounded text-center",
                `focus:border-${colors.primary}`,
                "focus:outline-none"
              ),
            })}
          >
            <input id={name} name={name} {...getInputProps()} />

            {file ? (
              <>
                <img
                  className="h-full rounded"
                  src={URL.createObjectURL(file)}
                />
              </>
            ) : (
              <>
                <span>Click to select files</span>

                <FinePrint>
                  Only *.jpeg and *.png images will be accepted
                </FinePrint>
              </>
            )}
          </div>
        </FormGroup>
      )}
    </Theme>
  );
};

export default ImageField;

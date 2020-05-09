import { useField } from "formik";
import React from "react";

import colors from "../colors";

import FormGroup from "./FormGroup";
import { hasError } from "./utils";

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const InputField = ({ label, name, type, ...props }: InputFieldProps) => {
  const [field, meta] = useField<string>({ name, type });
  const hasFieldError = hasError<string>(meta);

  return (
    <FormGroup
      error={meta.error}
      hasError={hasFieldError}
      label={label}
      labelFor={name}
    >
      <input
        className={`appearance-none border border-b-2 border-${
          hasFieldError ? colors.red : colors.grayLight
        } px-3 py-2 rounded text-${colors.gray} w-full focus:border-${
          colors.primary
        } focus:outline-none`}
        placeholder={label}
        type={type}
        {...field}
        {...props}
      />
    </FormGroup>
  );
};

export default InputField;

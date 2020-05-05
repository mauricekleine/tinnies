import { FieldInputProps, useField } from "formik";
import React from "react";

import colors from "../colors";

import FormGroup from "./FormGroup";
import { hasError } from "./utils";

type StandardInputField<T> = {
  field: FieldInputProps<T>;
  hasError?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const StandardInputField = <T extends string>({
  field,
  hasError,
  ...props
}: StandardInputField<T>) => (
  <input
    className={`appearance-none border border-b-2 border-${
      hasError ? colors.red : colors.grayLight
    } px-3 py-2 rounded text-${colors.gray} w-full focus:border-${
      colors.primary
    } focus:outline-none`}
    {...field}
    {...props}
  />
);

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
};

const InputField = ({ label, name, type }: InputFieldProps) => {
  const [field, meta] = useField<string>({ name, type });
  const hasFieldError = hasError<string>(meta);

  return (
    <FormGroup error={meta.error} hasError={hasFieldError} label={label}>
      <StandardInputField
        field={field}
        hasError={hasFieldError}
        name={name}
        placeholder={label}
        type={type}
      />
    </FormGroup>
  );
};

export default InputField;

/** @jsx createElement */
import classNames from "classnames";
import { useField } from "formik";
import { DetailedHTMLProps, InputHTMLAttributes, createElement } from "react";

import Theme from "../theme";

import FormGroup from "./FormGroup";
import { hasError } from "./utils";

type InputFieldProps = {
  dataCy?: string;
  label: string;
  name: string;
  type: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const InputField = ({
  dataCy,
  label,
  name,
  type,
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField<string>({ name, type });
  const hasFieldError = hasError<string>(meta);

  return (
    <Theme>
      {({ animations, border }) => (
        <FormGroup
          error={meta.error}
          hasError={hasFieldError}
          label={label}
          labelFor={name}
        >
          <input
            className={classNames(
              animations.default,
              border.colors.focus.primary,
              {
                [border.colors.red]: hasFieldError,
                [border.colors.default]: !hasFieldError,
              },
              "appearance-none border border-b-2 px-3 py-2 rounded w-full focus:outline-none"
            )}
            data-cy={dataCy}
            placeholder={label}
            type={type}
            {...field}
            {...props}
          />
        </FormGroup>
      )}
    </Theme>
  );
};

export default InputField;

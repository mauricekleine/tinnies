import { useField } from "formik";
import React from "react";

import colors from "./colors";

type Props = {
  label: string;
  name: string;
  type: string;
};

const FormField = ({ label, name, type }: Props) => {
  const [field, meta] = useField<string>({ name, type });

  return (
    <div className="mb-4">
      <label className={`block font-semibold mb-1 text-${colors.gray}`}>
        {label}
      </label>

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

      {meta.touched && meta.error ? (
        <div className={`italic px-1 text-${colors.red} text-xs`}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default FormField;

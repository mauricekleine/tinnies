import { useField } from "formik";
import React from "react";

type Props = {
  label: string;
  name: string;
  type: string;
};

const FormField = ({ label, name, type }: Props) => {
  const [field, meta] = useField<string>({ name, type });

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
        <input
          className="appearance-none border border-b-2 px-3 py-2 rounded text-gray-700 w-full focus:border-blue-300 focus:outline-none"
          name={name}
          placeholder={label}
          type={type}
          {...field}
        />
      </label>

      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
    </>
  );
};

export default FormField;

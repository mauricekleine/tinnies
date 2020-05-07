import React, { ReactNode } from "react";

import colors from "../colors";

type FormLabelProps = {
  children: ReactNode;
  labelFor: string;
};

const FormLabel = ({ children, labelFor }: FormLabelProps) => (
  <label
    className={`block font-semibold mb-1 text-${colors.gray}`}
    htmlFor={labelFor}
  >
    {children}
  </label>
);

export default FormLabel;

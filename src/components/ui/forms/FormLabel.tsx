import React, { ReactNode } from "react";

import colors from "../colors";

type FormLabelProps = {
  children: ReactNode;
};

const FormLabel = ({ children }: FormLabelProps) => (
  <label className={`block font-semibold mb-1 text-${colors.gray}`}>
    {children}
  </label>
);

export default FormLabel;

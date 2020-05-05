import React, { ReactNode } from "react";

import colors from "../colors";

type FormErrorProps = {
  children: ReactNode;
};

const FormError = ({ children }: FormErrorProps) => (
  <div className={`italic px-1 text-${colors.red} text-xs`}>{children}</div>
);

export default FormError;

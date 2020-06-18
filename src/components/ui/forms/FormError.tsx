import React, { ReactNode } from "react";

import Theme from "../theme";

type FormErrorProps = {
  children: ReactNode;
};

const FormError = ({ children }: FormErrorProps) => (
  <Theme>
    {({ colors }) => (
      <div className={`italic px-1 text-${colors.red} text-xs`}>{children}</div>
    )}
  </Theme>
);

export default FormError;

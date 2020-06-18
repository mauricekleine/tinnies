import React, { ReactNode } from "react";

import Theme from "../theme";

type FormLabelProps = {
  children: ReactNode;
  labelFor: string;
};

const FormLabel = ({ children, labelFor }: FormLabelProps) => (
  <Theme>
    {({ colors }) => (
      <label
        className={`block font-semibold mb-1 text-${colors.gray}`}
        htmlFor={labelFor}
      >
        {children}
      </label>
    )}
  </Theme>
);

export default FormLabel;

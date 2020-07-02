/** @jsx createElement */
import { ReactNode, createElement } from "react";

import Theme from "../theme";

type FormErrorProps = {
  children: ReactNode;
};

const FormError = ({ children }: FormErrorProps) => (
  <Theme>
    {({ colors }) => (
      <p className={`italic px-1 text-${colors.red} text-xs`}>{children}</p>
    )}
  </Theme>
);

export default FormError;

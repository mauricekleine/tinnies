/** @jsx createElement */
import classNames from "classnames";
import { ReactNode, createElement } from "react";

import Theme from "../theme";

type FormErrorProps = {
  children: ReactNode;
};

const FormError = ({ children }: FormErrorProps) => (
  <Theme>
    {({ text }) => (
      <p className={classNames(text.colors.red, "italic px-1 text-xs")}>
        {children}
      </p>
    )}
  </Theme>
);

export default FormError;

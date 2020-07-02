/** @jsx createElement */
import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps, createElement } from "react";

import Spinner from "./Spinner";
import Theme from "./theme";

type ButtonProps = {
  dataCy?: string;
  isLoading?: boolean;
  isTransparent?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({
  children,
  dataCy,
  isLoading,
  isTransparent,
  onClick,
  ...props
}: ButtonProps) => (
  <Theme>
    {({ colors }) => (
      <button
        className={classNames(
          "border border-b-2 font-light h-10 px-3 md:px-4 rounded focus:outline-none",
          {
            [`bg-${colors.primary}`]: !isTransparent,
            [`border-${colors.primaryAccent}`]: !isTransparent,
            ["border-transparent"]: isTransparent,
            [`text-${colors.white}`]: !isTransparent,
            ["hover:underline"]: isTransparent,
            [`hover:bg-${colors.white}`]: !isTransparent,
            [`hover:border-${colors.primaryAccent}`]: !isTransparent,
            [`hover:text-${colors.primaryAccent}`]: !isTransparent,
            [`hover:text-${colors.primary}`]: isTransparent,
          }
        )}
        data-cy={dataCy}
        onClick={onClick}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    )}
  </Theme>
);

export default Button;

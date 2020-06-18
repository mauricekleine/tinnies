import classNames from "classnames";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import Spinner from "../Spinner";
import Theme from "../theme";

type ButtonProps = {
  isLoading?: boolean;
  isTransparent?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({
  children,
  isLoading,
  isTransparent,
  onClick,
  ...props
}: ButtonProps) => (
  <Theme>
    {({ colors }) => (
      <button
        className={classNames(
          `border border-b-2 font-light h-10 px-3 md:px-4 rounded focus:outline-none hover:text-${colors.primaryAccent}`,
          {
            [`bg-${colors.primary}`]: !isTransparent,
            [`border-${colors.primaryAccent}`]: !isTransparent,
            "border-transparent": isTransparent,
            [`text-${colors.white}`]: !isTransparent,
            [`hover:bg-${colors.white}`]: !isTransparent,
            [`hover:border-${colors.primaryAccent}`]: !isTransparent,
          }
        )}
        onClick={onClick}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    )}
  </Theme>
);

export default Button;

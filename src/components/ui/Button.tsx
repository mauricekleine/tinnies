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
    {({ bg, border, text }) => (
      <button
        className={classNames(
          "border border-b-2 font-light h-10 px-3 md:px-4 rounded focus:outline-none",
          {
            [bg.primary]: !isTransparent,
            [bg.hover.white]: !isTransparent,
            [border.colors.primaryAccent]: !isTransparent,
            [border.colors.hover.primaryAccent]: !isTransparent,
            ["border-transparent"]: isTransparent,
            ["hover:underline"]: isTransparent,
            [text.colors.white]: !isTransparent,
            [text.colors.hover.primary]: isTransparent,
            [text.colors.hover.primaryAccent]: !isTransparent,
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

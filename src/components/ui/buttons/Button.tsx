import React from "react";

import Spinner from "../Spinner";

import { ButtonProps, getButtonClasses } from "./utils";

const Button = ({
  borderless,
  children,
  isLoading,
  onClick,
  ...props
}: ButtonProps) => (
  <button
    className={getButtonClasses({ borderless })}
    onClick={onClick}
    {...props}
  >
    {isLoading ? <Spinner /> : children}
  </button>
);

export default Button;

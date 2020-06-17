import React from "react";

import colors from "../colors";

import { ButtonProps } from "./utils";

type ButtonLinkProps = {
  children: ButtonProps["children"];
  onClick: ButtonProps["onClick"];
};

const ButtonLink = ({ children, onClick }: ButtonLinkProps) => (
  <p
    className={`cursor-pointer p-2 hover:text-${colors.primaryAccent}`}
    onClick={onClick}
  >
    {children}
  </p>
);

export default ButtonLink;

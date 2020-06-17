import Link, { LinkProps } from "next/link";
import React from "react";

import { ButtonProps, getButtonClasses } from "./utils";

type SecondaryButtonProps = {
  borderless?: ButtonProps["borderless"];
  children: ButtonProps["children"];
  "data-cy"?: string;
} & LinkProps;

const SecondaryButton = ({
  borderless,
  children,
  "data-cy": dataCy,
  ...props
}: SecondaryButtonProps) => {
  return (
    <Link {...props}>
      <a className={getButtonClasses({ borderless })} data-cy={dataCy}>
        {children}
      </a>
    </Link>
  );
};

export default SecondaryButton;

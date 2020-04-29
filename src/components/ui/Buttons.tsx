import Link, { LinkProps } from "next/link";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
} from "react";

import Spinner from "./Spinner";
import colors from "./colors";

type ButtonProps = {
  borderless?: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
  onClick: MouseEventHandler;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const getButtonClasses = ({ borderless }: { borderless: boolean }) => {
  const baseClasses = `bg-${colors.primary} border border-b-2 border-transparent font-light px-3 md:px-4 py-2 rounded text-${colors.white} hover:bg-${colors.white} hover:border-${colors.primaryAccent} hover:text-${colors.primaryAccent}`;
  const borderClasses = `border-${colors.primaryAccent}`;

  if (borderless) {
    return baseClasses;
  }

  return `${baseClasses} ${borderClasses}`;
};

export const Button = ({
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

type ButtonLinkProps = {
  borderless?: ButtonProps["borderless"];
  children: ButtonProps["children"];
} & LinkProps;

export const ButtonLink = ({
  borderless,
  children,
  ...props
}: ButtonLinkProps) => (
  <Link {...props}>
    <a className={getButtonClasses({ borderless })}>{children}</a>
  </Link>
);

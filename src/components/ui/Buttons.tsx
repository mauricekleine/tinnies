import Link, { LinkProps } from "next/link";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
} from "react";

import colors from "./colors";

type ButtonProps = {
  borderless?: boolean;
  children: React.ReactNode;
  onClick: MouseEventHandler;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const getButtonClasses = ({ borderless }: { borderless: boolean }) => {
  const baseClasses = `bg-${colors.primary} border border-b-2 border-r-2 border-transparent font-light px-4 py-2 rounded text-${colors.white} hover:bg-${colors.white} hover:border-${colors.primaryAccent} hover:text-${colors.primaryAccent}`;
  const borderClasses = `border-${colors.primaryAccent}`;

  if (borderless) {
    return baseClasses;
  }

  return `${baseClasses} ${borderClasses}`;
};

export const Button = ({
  borderless,
  children,
  onClick,
  ...props
}: ButtonProps) => (
  <button
    className={getButtonClasses({ borderless })}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

type ButtonLinkProps = {
  borderless?: ButtonProps["borderless"];
  children: ButtonProps["children"];
  to: LinkProps["href"];
};

export const ButtonLink = ({ borderless, children, to }: ButtonLinkProps) => (
  <Link href={to}>
    <a className={getButtonClasses({ borderless })}>{children}</a>
  </Link>
);

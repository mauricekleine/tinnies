import Link, { LinkProps } from "next/link";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
} from "react";

type ButtonProps = {
  borderless?: boolean;
  children: React.ReactNode;
  onClick: MouseEventHandler;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const getButtonClasses = ({ borderless }: { borderless: boolean }) => {
  const baseClasses =
    "bg-orange-500 px-4 py-2 text-sm rounded text-white hover:bg-white hover:text-orange-500";
  const borderClasses = "border border-b-2 border-white hover:border-orange-500";

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

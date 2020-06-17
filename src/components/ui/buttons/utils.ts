import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
} from "react";

import colors from "../colors";

export type ButtonProps = {
  borderless?: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
  onClick: MouseEventHandler;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const getButtonClasses = ({ borderless }: { borderless: boolean }) => {
  const baseClasses = `bg-${colors.primary} border border-b-2 border-transparent flex font-light h-10 items-center px-3 md:px-4 rounded text-${colors.white} focus:outline-none hover:bg-${colors.white} hover:border-${colors.primaryAccent} hover:text-${colors.primaryAccent}`;
  const borderClasses = `border-${colors.primaryAccent}`;

  if (borderless) {
    return baseClasses;
  }

  return `${baseClasses} ${borderClasses}`;
};

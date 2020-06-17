import NextLink, { LinkProps } from "next/link";
import React, { ReactNode } from "react";

import colors from "./colors";

type TypographyProps = { children: ReactNode };

export const FinePrint = ({ children }: TypographyProps) => (
  <span className={`text-${colors.gray} text-sm`}>{children}</span>
);

export const HeadingOne = ({ children }: TypographyProps) => (
  <p className="font-semibold text-xl">{children}</p>
);

export const Link = ({ children, href }: LinkProps & TypographyProps) => (
  <NextLink href={href}>
    <a className={`py-1 hover:text-${colors.primaryAccent}`}>{children}</a>
  </NextLink>
);

export const Muted = ({ children }: TypographyProps) => (
  <span className={`text-${colors.gray}`}>{children}</span>
);

export const Title = ({ children }: TypographyProps) => (
  <p className="mb-4 text-3xl">{children}</p>
);

export const UserName = ({ children }: TypographyProps) => (
  <span className={`font-semibold text-${colors.primaryAccent}`}>{children}</span>
);

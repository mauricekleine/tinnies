import NextLink, { LinkProps } from "next/link";
import React, { ReactNode } from "react";

import colors from "./colors";

export const Link = ({
  children,
  href,
}: { children: ReactNode } & LinkProps) => (
  <NextLink href={href}>
    <a className={`py-1 hover:text-${colors.primaryAccent}`}>{children}</a>
  </NextLink>
);

type TitleProps = {
  children: ReactNode;
};

export const Title = ({ children }: TitleProps) => (
  <p className="mb-4 text-3xl">{children}</p>
);

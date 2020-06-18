import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React, { ReactNode } from "react";

import Theme from "../theme";

type LinkProps = { children: ReactNode; href: NextLinkProps["href"] };

const Link = ({ children, href }: LinkProps) => (
  <Theme>
    {({ colors }) => (
      <NextLink href={href}>
        <a className={`py-1 hover:text-${colors.primaryAccent}`}>{children}</a>
      </NextLink>
    )}
  </Theme>
);

export default Link;

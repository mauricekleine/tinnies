import classNames from "classnames";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

import Theme from "../theme";

type LinkProps = {
  children: ReactNode | ReactNode[];
  href: NextLinkProps["href"];
};

const Link = ({ children, href }: LinkProps) => (
  <Theme>
    {({ text }) => (
      <NextLink href={href}>
        <a
          className={classNames(
            text.colors.hover.primary,
            "py-1 hover:underline"
          )}
        >
          {children}
        </a>
      </NextLink>
    )}
  </Theme>
);

export default Link;

import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";

import Theme from "../theme";

type NavbarLinkProps = {
  children: ReactNode;
  "data-cy"?: string;
  href: LinkProps["href"];
  isBorderless?: boolean;
};

const NavbarLink = ({
  children,
  "data-cy": dataCy,
  href,
  isBorderless,
}: NavbarLinkProps) => {
  return (
    <Theme>
      {({ colors }) => (
        <Link href={href}>
          <a
            className={classNames(
              `bg-${colors.primary} border border-b-2 border-transparent flex font-light h-10 items-center px-3 md:px-4 rounded text-${colors.white} focus:outline-none hover:bg-${colors.white} hover:border-${colors.primaryAccent} hover:text-${colors.primaryAccent}`,
              {
                [`border-${colors.primaryAccent}`]: !isBorderless,
              }
            )}
            data-cy={dataCy}
          >
            {children}
          </a>
        </Link>
      )}
    </Theme>
  );
};

export default NavbarLink;

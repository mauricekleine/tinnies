import classNames from "classnames";
import React, { ReactNode } from "react";

import Theme from "../theme";

type DropdownProps = {
  children: ReactNode;
  isOpen: boolean;
  width?: string;
};

const Dropdown = ({ children, isOpen, width }: DropdownProps) => (
  <Theme>
    {({ colors }) => (
      <div
        className={classNames(
          `absolute bg-white border border-${colors.grayLight} border-b-2`,
          { hidden: !isOpen },
          `mt-1 right-0 rounded shadow-lg w-${width} z-50`
        )}
      >
        {children}
      </div>
    )}
  </Theme>
);

export default Dropdown;

import classNames from "classnames";
import React, { ReactNode } from "react";

import Theme from "../theme";

type DropdownProps = {
  children: ReactNode;
  isOpen: boolean;
  width?: string;
};

const Dropdown = ({ children, isOpen, width }: DropdownProps) =>
  isOpen && (
    <Theme>
      {({ colors }) => (
        <div
          className={classNames(
            `absolute bg-white border border-${colors.grayLight}`,
            `mt-1 right-0 rounded-md shadow-lg w-${width} z-40`
          )}
        >
          {children}
        </div>
      )}
    </Theme>
  );

export default Dropdown;

import classNames from "classnames";
import React, { ReactNode } from "react";

import Animate from "../Animate";
import Theme from "../theme";

type DropdownProps = {
  children: ReactNode;
  isOpen: boolean;
  width?: string;
};

const Dropdown = ({ children, isOpen, width }: DropdownProps) => (
  <Theme>
    {({ colors }) => (
      <Animate
        className={classNames(
          `absolute bg-white border border-${colors.grayLight}`,
          `mt-1 right-0 rounded-md shadow-lg w-${width} z-40`
        )}
        isVisible={isOpen}
        speed="fast"
      >
        {children}
      </Animate>
    )}
  </Theme>
);

export default Dropdown;

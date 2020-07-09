/** @jsx createElement */
import classNames from "classnames";
import { ReactNode, createElement } from "react";

import Theme from "./theme";

type DropdownProps = {
  children: ReactNode | ReactNode[];
  isOpen: boolean;
  width?: string;
};

const Dropdown = ({ children, isOpen, width }: DropdownProps) =>
  isOpen && (
    <Theme>
      {({ bg, border }) => (
        <div
          className={classNames(
            bg.white,
            border.colors.default,
            "absolute border mt-1 right-0 rounded-md shadow-lg",
            `w-${width}`,
            "z-40"
          )}
        >
          {children}
        </div>
      )}
    </Theme>
  );

export default Dropdown;

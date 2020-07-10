/** @jsx createElement */
import classNames from "classnames";
import { ReactNode, createElement } from "react";

import Theme from "./theme";

type DropdownProps = {
  children: ReactNode | ReactNode[];
  isOpen: boolean;
  width?: "w-24" | "w-48" | "w-full";
};

const Dropdown = ({ children, isOpen, width = "w-full" }: DropdownProps) =>
  isOpen && (
    <Theme>
      {({ bg, border }) => (
        <div
          className={classNames(
            bg.white,
            border.colors.default,
            width,
            "absolute border mt-1 right-0 rounded-md shadow-lg",
            "z-40"
          )}
        >
          {children}
        </div>
      )}
    </Theme>
  );

export default Dropdown;

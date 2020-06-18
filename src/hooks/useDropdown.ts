import React, { useState } from "react";

import { theme } from "../components/ui/theme";

import useOnClickOutside from "./useOnClickOutside";

type DropdownOptions = {
  width?: string;
};

const useDropdown = (
  dropdownRef: React.MutableRefObject<HTMLDivElement>,
  options: DropdownOptions = {}
) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleToggle = () => setIsOpen(!isOpen);

  const { width = "full" } = options;

  const dropdownProps = {
    className: `absolute bg-white border border-${theme.colors.grayLight} border-b-2 mt-1 right-0 rounded shadow-lg w-${width} z-50`,
  };

  useOnClickOutside(dropdownRef, handleClose);

  return {
    dropdownProps,
    handleClose,
    handleOpen,
    handleToggle,
    isOpen,
  };
};

export default useDropdown;

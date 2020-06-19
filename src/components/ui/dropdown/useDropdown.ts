import React, { useState } from "react";

import { useOnClickOutside } from "../utils";

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
    isOpen,
    width,
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

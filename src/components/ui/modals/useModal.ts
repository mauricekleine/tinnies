import React, { useState } from "react";

import { useOnClickOutside } from "../utils";

const useModal = (modalRef: React.MutableRefObject<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleToggle = () => setIsOpen(!isOpen);

  useOnClickOutside(modalRef, handleClose);

  return {
    handleClose,
    handleOpen,
    handleToggle,
    isOpen,
  };
};

export default useModal;

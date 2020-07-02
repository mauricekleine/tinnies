import { MutableRefObject, useState } from "react";

import useOnClickOutside from "./useOnClickOutside";

const useToggle = (ref: MutableRefObject<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleToggle = () => setIsOpen(!isOpen);

  useOnClickOutside(ref, handleClose);

  return {
    handleClose,
    handleOpen,
    handleToggle,
    isOpen,
  };
};

export default useToggle;

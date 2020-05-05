import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react";

import useOnClickOutside from "../../hooks/useOnClickOutside";

import colors from "./colors";

type RenderProps = {
  dropdownProps: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  handleClose: () => void;
  handleOpen: () => void;
  handleToggle: () => void;
  isOpen: boolean;
};

type Props = {
  children: (renderProps: RenderProps) => ReactNode;
  width?: number | string;
};

const Dropdown = ({ children, width = "full" }: Props) => {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleToggle = () => setIsOpen(!isOpen);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const dropdownProps = {
    className: `absolute bg-white border border-${colors.grayLight} border-b-2 mt-2 right-0 rounded shadow-lg w-${width} z-50`,
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {children({
        dropdownProps,
        handleClose,
        handleOpen,
        handleToggle,
        isOpen,
      })}
    </div>
  );
};

export default Dropdown;

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
  handleToggle: () => void;
  isOpen: boolean;
};

type Props = {
  children: (renderProps: RenderProps) => ReactNode;
};

const Dropdown = ({ children }: Props) => {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const dropdownProps = {
    className: `absolute bg-white border border-${colors.grayLight} border-b-2 py-2 px-4 right-0 rounded shadow w-48 z-50`,
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {children({ dropdownProps, handleToggle, isOpen })}
    </div>
  );
};

export default Dropdown;

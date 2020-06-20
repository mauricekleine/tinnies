import classNames from "classnames";
import React, { ReactNode, forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import Animate from "../Animate";
import Theme from "../theme";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
};

const Modal = ({ children, isOpen }: ModalProps, ref) => {
  const element = useRef(document.createElement("div"));

  useEffect(() => {
    const currentElement = element.current;
    document.getElementById("modal-root").appendChild(currentElement);

    return () => {
      document.getElementById("modal-root").removeChild(currentElement);
    };
  });

  return createPortal(
    <Theme>
      {({ colors }) => (
        <Animate
          className={classNames(
            `bg-${colors.grayDark}`,
            "bg-opacity-75 fixed flex h-full items-center justify-center left-0 top-0 w-full"
          )}
          isVisible={isOpen}
        >
          <div
            className={`bg-${colors.white} border border-${colors.grayLight} border-b-2 p-4 rounded-md shadow-lg`}
            ref={ref}
          >
            {children}
          </div>
        </Animate>
      )}
    </Theme>,
    element.current
  );
};

export default forwardRef(Modal);

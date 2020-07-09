/** @jsx createElement */
import classNames from "classnames";
import { ReactNode, createElement, forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import Animate from "./Animate";
import Theme from "./theme";

type ModalProps = {
  children: ReactNode | ReactNode[];
  isOpen: boolean;
};

const Modal = ({ children, isOpen }: ModalProps, ref) => {
  const element = useRef(null);

  useEffect(() => {
    element.current = document.createElement("div");
    document.getElementById("modal-root").appendChild(element.current);

    return () => {
      document.getElementById("modal-root").removeChild(element.current);
    };
  }, []);

  if (!element.current) {
    return null;
  }

  return createPortal(
    <Theme>
      {({ bg, border }) => (
        <Animate
          className={classNames(
            bg.modal,
            "fixed flex h-full items-center justify-center left-0 top-0 w-full"
          )}
          isVisible={isOpen}
        >
          <div
            className={classNames(
              bg.white,
              border.colors.default,
              "border border-b-2 p-4 rounded-md shadow-lg"
            )}
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

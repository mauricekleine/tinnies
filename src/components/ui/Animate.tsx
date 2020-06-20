import classNames from "classnames";
import React, { ReactNode, useEffect, useState } from "react";

import Theme from "./theme";

type AnimateProps = {
  children: ReactNode;
  className: string;
  isVisible: boolean;
  speed?: "default" | "fast";
};

const Animate = ({
  children,
  className,
  isVisible,
  speed = "default",
}: AnimateProps) => {
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    let animationFrame;

    if (isVisible) {
      animationFrame = requestAnimationFrame(() => {
        setIsEntering(false);
      });
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      setIsEntering(true);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <Theme>
      {({ animations }) => (
        <div
          className={classNames(animations[speed], className, {
            "opacity-0": isEntering,
            "opacity-100": !isEntering,
          })}
        >
          {children}
        </div>
      )}
    </Theme>
  );
};

export default Animate;

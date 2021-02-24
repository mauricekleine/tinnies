import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";

import Theme from "./theme";

type AnimateProps = {
  children: ReactNode | ReactNode[];
  className: string;
  isVisible: boolean;
};

const Animate = ({ children, className, isVisible }: AnimateProps) => {
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
          className={classNames(animations.fast, className, {
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

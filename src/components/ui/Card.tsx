import classNames from "classnames";
import { ReactNode } from "react";

import Theme from "./theme";

type Props = {
  children: ReactNode | ReactNode[];
  px?: string;
};

const Card = ({ children, px = "6" }: Props) => (
  <Theme>
    {({ bg, border }) => (
      <section
        className={classNames(
          bg.white,
          border.colors.default,
          "border border-b-4 mb-8",
          `px-${px}`,
          "py-6 rounded-lg"
        )}
      >
        {children}
      </section>
    )}
  </Theme>
);

export default Card;

import classNames from "classnames";
import { ReactNode } from "react";

import Theme from "../theme";

const Bold = ({ children }: { children: ReactNode }) => (
  <Theme>
    {({ text }) => (
      <span className={classNames(text.colors.primaryAccent, "font-semibold")}>
        {children}
      </span>
    )}
  </Theme>
);

export default Bold;

import classnames from "classnames";
import { ReactNode } from "react";

import Theme from "../theme";

const Muted = ({ children }: { children: ReactNode }) => (
  <Theme>
    {({ text }) => (
      <span className={classnames(text.colors.muted)}>{children}</span>
    )}
  </Theme>
);

export default Muted;

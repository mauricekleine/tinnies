/** @jsx createElement */
import { ReactNode, createElement } from "react";

import Theme from "../theme";

const Muted = ({ children }: { children: ReactNode }) => (
  <Theme>
    {({ text }) => <span className={text.colors.muted}>{children}</span>}
  </Theme>
);

export default Muted;

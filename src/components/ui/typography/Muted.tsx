import React, { ReactNode } from "react";

import Theme from "../theme";

const Muted = ({ children }: { children: ReactNode }) => (
  <Theme>
    {({ colors }) => <span className={`text-${colors.gray}`}>{children}</span>}
  </Theme>
);

export default Muted;

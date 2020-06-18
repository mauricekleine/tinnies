import React, { ReactNode } from "react";

import Theme from "../theme";

const Bold = ({ children }: { children: ReactNode }) => (
  <Theme>
    {({ colors }) => (
      <span className={`font-semibold text-${colors.primaryAccent}`}>
        {children}
      </span>
    )}
  </Theme>
);

export default Bold;

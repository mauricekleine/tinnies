import React, { ReactNode } from "react";

import Theme from "../theme";

const FinePrint = ({ children }: { children: ReactNode }) => (
  <Theme>
    {({ colors }) => (
      <span className={`text-${colors.gray} text-sm`}>{children}</span>
    )}
  </Theme>
);

export default FinePrint;

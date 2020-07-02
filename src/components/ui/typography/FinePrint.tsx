/** @jsx createElement */
import { ReactNode, createElement } from "react";

import Theme from "../theme";

const FinePrint = ({ children }: { children: ReactNode }) => (
  <Theme>
    {({ colors }) => (
      <span className={`font-normal text-${colors.gray} text-sm`}>
        {children}
      </span>
    )}
  </Theme>
);

export default FinePrint;

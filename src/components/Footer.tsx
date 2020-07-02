/** @jsx createElement */
import { createElement } from "react";

import Theme from "./ui/theme";

const Footer = () => (
  <Theme>
    {({ colors }) => (
      <footer className={`bg-${colors.grayDark}`}>
        <div className={`mx-auto p-2 text-${colors.white} w-3/5`}>
          <span className="text-xs">
            ©{new Date().getFullYear()} - Tinnies | Beer tracking, but better
          </span>
        </div>
      </footer>
    )}
  </Theme>
);

export default Footer;

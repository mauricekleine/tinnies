/** @jsx createElement */
import classNames from "classnames";
import { createElement } from "react";

import Theme from "./ui/theme";

const Footer = () => (
  <Theme>
    {({ bg, text }) => (
      <footer className={bg.footer}>
        <div className={classNames(text.colors.white, "mx-auto p-2 w-3/5")}>
          <span className="text-xs">
            ©{new Date().getFullYear()} - Tinnies | Beer tracking, but better
          </span>
        </div>
      </footer>
    )}
  </Theme>
);

export default Footer;

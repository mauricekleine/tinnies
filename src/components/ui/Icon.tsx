/** @jsx createElement */
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { createElement } from "react";

import Theme from "./theme";

const Icon = ({ icon }: { icon: FontAwesomeIconProps["icon"] }) => (
  <Theme>
    {({ colors }) => (
      <FontAwesomeIcon className={`text-${colors.gray}`} icon={icon} />
    )}
  </Theme>
);

export default Icon;

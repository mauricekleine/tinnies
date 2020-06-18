import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React from "react";

import Theme from "./theme";

export const Icon = ({ icon }: { icon: FontAwesomeIconProps["icon"] }) => (
  <Theme>
    {({ colors }) => (
      <FontAwesomeIcon className={`text-${colors.gray}`} icon={icon} />
    )}
  </Theme>
);

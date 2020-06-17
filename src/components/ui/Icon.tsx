import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React from "react";

import colors from "./colors";

export const Icon = ({ icon }: { icon: FontAwesomeIconProps["icon"] }) => (
  <FontAwesomeIcon className={`text-${colors.gray}`} icon={icon} />
);

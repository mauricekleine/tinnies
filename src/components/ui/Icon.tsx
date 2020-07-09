/** @jsx createElement */
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { createElement } from "react";

const Icon = ({ icon }: { icon: FontAwesomeIconProps["icon"] }) => (
  <FontAwesomeIcon icon={icon} />
);

export default Icon;

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

const Icon = ({ icon }: { icon: FontAwesomeIconProps["icon"] }) => (
  <FontAwesomeIcon icon={icon} />
);

export default Icon;

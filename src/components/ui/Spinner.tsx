/** @jsx createElement */
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createElement } from "react";

const Spinner = () => <FontAwesomeIcon icon={faSpinner} spin />;

export default Spinner;

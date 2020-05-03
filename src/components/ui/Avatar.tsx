import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import colors from "./colors";

const Avatar = () => (
  <div
    className={`bg-${colors.grayLight} flex h-10 items-center justify-center rounded-full w-10`}
  >
    <FontAwesomeIcon className={`h-5 text-${colors.white} w-5`} icon={faUser} />
  </div>
);

export default Avatar;

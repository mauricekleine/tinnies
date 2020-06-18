import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import Theme from "./theme";

const Avatar = () => (
  <Theme>
    {({ colors }) => (
      <div
        className={`bg-${colors.grayLight} flex h-10 items-center justify-center rounded-full w-10`}
      >
        <FontAwesomeIcon
          className={`h-5 text-${colors.white} w-5`}
          icon={faUser}
        />
      </div>
    )}
  </Theme>
);

export default Avatar;

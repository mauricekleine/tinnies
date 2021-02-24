import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import Theme from "./theme";

const Avatar = () => (
  <Theme>
    {({ bg, text }) => (
      <div
        className={classNames(
          bg.default,
          "flex h-10 items-center justify-center rounded-full w-10"
        )}
      >
        <FontAwesomeIcon
          className={classNames(text.colors.white, "h-5 w-5")}
          icon={faUser}
        />
      </div>
    )}
  </Theme>
);

export default Avatar;

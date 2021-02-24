import { faBeer, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import NextLink from "next/link";
import { useRef } from "react";

import {
  NAVIGATION_AVATAR,
  NAVIGATION_LOGIN_BTN,
  NAVIGATION_LOGOUT_BTN,
  NAVIGATION_SIGNUP_BTN,
} from "../../../../cypress/selectors";
import { User } from "../../../types/graphql";
import Avatar from "../Avatar";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Theme from "../theme";
import { Link } from "../typography";
import { useOpenHandler } from "../utils";

import NavbarLink from "./NavbarLink";

type Props = {
  onLogout: () => void;
  user: User;
};

const Navbar = ({ onLogout, user }: Props) => {
  const dropdownRef = useRef();
  const { handleClose, handleToggle, isOpen } = useOpenHandler(dropdownRef);

  const handleLogout = async () => {
    handleClose();
    onLogout();
  };

  return (
    <Theme>
      {({ bg, border, text }) => (
        <nav
          className={classNames(
            bg.primary,
            border.colors.primaryAccent,
            "border-b-2  flex h-16 items-center justify-between px-6 py-3"
          )}
        >
          <div className="flex">
            <NextLink href={user ? "/home" : "/"}>
              <a
                className={classNames(
                  text.colors.white,
                  "flex items-center mr-4"
                )}
              >
                <FontAwesomeIcon
                  className="mr-2 transform -rotate-45"
                  icon={faBeer}
                  size="2x"
                />

                <span className="font-semibold md:text-xl">Tinnies</span>
              </a>
            </NextLink>

            {user && (
              <div className="flex">
                <div className="hidden sm:flex">
                  <NavbarLink isBorderless href="/home">
                    Home
                  </NavbarLink>

                  <NavbarLink isBorderless href="/my/beers">
                    My Beers
                  </NavbarLink>

                  <NavbarLink isBorderless href="/my/collections">
                    My Collections
                  </NavbarLink>
                </div>

                <NavbarLink href="/new/beer">
                  <FontAwesomeIcon className="h-4 mr-2 w-4" icon={faPlus} />
                  Add a beer
                </NavbarLink>
              </div>
            )}
          </div>

          <div className="flex">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="cursor-pointer mr-2 focus:outline-none"
                  data-cy={NAVIGATION_AVATAR}
                  onClick={handleToggle}
                  type="button"
                >
                  <Avatar />
                </button>

                <Dropdown isOpen={isOpen} width="w-48">
                  <div className="flex flex-col px-4 py-2">
                    <span
                      className={classNames(
                        border.colors.default,
                        "border-b sm:mb-2 py-2"
                      )}
                    >
                      Cheers {user.name}!
                    </span>

                    <div
                      className={classNames(
                        border.colors.default,
                        "border-b flex flex-col mb-2 py-2 sm:hidden"
                      )}
                    >
                      <Link href="/home">Home</Link>
                      <Link href="/my/beers">My Beers</Link>
                      <Link href="/my/collections">My Collections</Link>
                    </div>

                    <Button
                      dataCy={NAVIGATION_LOGOUT_BTN}
                      onClick={handleLogout}
                    >
                      Log out
                    </Button>
                  </div>
                </Dropdown>
              </div>
            ) : (
              <>
                <NavbarLink
                  isBorderless
                  dataCy={NAVIGATION_LOGIN_BTN}
                  href="/login"
                >
                  Log in
                </NavbarLink>

                <NavbarLink dataCy={NAVIGATION_SIGNUP_BTN} href="/signup">
                  Sign up
                </NavbarLink>
              </>
            )}
          </div>
        </nav>
      )}
    </Theme>
  );
};

export default Navbar;

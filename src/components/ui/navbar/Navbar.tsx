import { faBeer, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NextLink from "next/link";
import React, { useRef } from "react";

import {
  NAVIGATION_LOGIN_BTN,
  NAVIGATION_SIGNUP_BTN,
} from "../../../../cypress/selectors";
import useDropdown from "../../../hooks/useDropdown";
import useFetch from "../../../hooks/useFetch";
import { User } from "../../../models/user";
import { LOGOUT_RESOURCE, MY_PROFILE_RESOURCE } from "../../../utils/resources";
import Avatar from "../Avatar";
import Button from "../buttons";
import Theme from "../theme";
import { Link } from "../typography";

import NavbarLink from "./NavbarLink";

type Props = {
  isLoading: boolean;
  user: User;
};

const Navbar = ({ isLoading, user }: Props) => {
  const dropdownRef = useRef();
  const { dropdownProps, handleToggle, isOpen } = useDropdown(dropdownRef, {
    width: "48",
  });
  const { del } = useFetch<User>(LOGOUT_RESOURCE, {
    cacheKey: MY_PROFILE_RESOURCE,
  });

  const handleLogout = async () => {
    await del();
  };

  return (
    <Theme>
      {({ colors }) => (
        <nav
          className={`bg-${colors.primary} border-b-2 border-${colors.primaryAccent} flex h-16 items-center justify-between px-6 py-3`}
        >
          <div className="flex">
            <NextLink href={user ? "/home" : "/"}>
              <a className={`flex items-center text-${colors.white} mr-4`}>
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

          <div>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div className="cursor-pointer mr-2" onClick={handleToggle}>
                  <Avatar />
                </div>

                {isOpen && (
                  <div {...dropdownProps}>
                    <div className="flex flex-col px-4 py-2">
                      <span
                        className={`border-b border-${colors.grayLight} py-2`}
                      >
                        Cheers {user.name}!
                      </span>

                      <div
                        className={`border-b border-${colors.grayLight} flex flex-col py-2 sm:hidden`}
                      >
                        <Link href="/home">Home</Link>
                        <Link href="/my/beers">My Beers</Link>
                        <Link href="/my/collections">My Collections</Link>
                      </div>

                      <Button isLoading={isLoading} onClick={handleLogout}>
                        Log out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              !isLoading && (
                <div className="flex">
                  <NavbarLink
                    isBorderless
                    data-cy={NAVIGATION_LOGIN_BTN}
                    href="/login"
                  >
                    Log in
                  </NavbarLink>

                  <NavbarLink data-cy={NAVIGATION_SIGNUP_BTN} href="/signup">
                    Sign up
                  </NavbarLink>
                </div>
              )
            )}
          </div>
        </nav>
      )}
    </Theme>
  );
};

export default Navbar;
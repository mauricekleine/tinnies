import { faBeer, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NextLink from "next/link";
import React from "react";

import useFetch from "../hooks/useFetch";
import { UserDocument } from "../models/user";
import { LOGOUT_RESOURCE, READ_MY_PROFILE_RESOURCE } from "../utils/endpoints";

import Avatar from "./ui/Avatar";
import { Button, ButtonLink } from "./ui/Buttons";
import Dropdown from "./ui/Dropdown";
import { Link } from "./ui/Typography";
import colors from "./ui/colors";

const Navigation = () => {
  const { data: user, del, isLoading } = useFetch<UserDocument>(
    LOGOUT_RESOURCE,
    {
      cacheKey: READ_MY_PROFILE_RESOURCE,
    }
  );

  const handleLogout = async () => {
    await del();
  };

  return (
    <nav
      className={`bg-${colors.primary} border-b-2 border-${colors.primaryAccent} flex items-center justify-between px-6 py-4`}
    >
      <div className="flex">
        <NextLink href="/">
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
              <ButtonLink borderless href="/home">
                Home
              </ButtonLink>

              <ButtonLink borderless href="/my/beers">
                My Beers
              </ButtonLink>
            </div>

            <ButtonLink href="/new/beer">
              <div className="flex items-center">
                <FontAwesomeIcon className="h-4 mr-2 w-4" icon={faPlus} />
                Add a beer
              </div>
            </ButtonLink>
          </div>
        )}
      </div>

      <div>
        {user ? (
          <Dropdown>
            {({ dropdownProps, handleToggle, isOpen }) => (
              <>
                <div className="cursor-pointer" onClick={handleToggle}>
                  <Avatar />
                </div>

                {isOpen && (
                  <div {...dropdownProps}>
                    <div className="flex flex-col">
                      <span
                        className={`border-b border-${colors.grayLight} py-2`}
                      >
                        Cheers {user.name}!
                      </span>

                      <div
                        className={`border-b border-${colors.grayLight} mb-2 py-2 flex flex-col mb-1 sm:hidden`}
                      >
                        <Link href="/home">Home</Link>
                        <Link href="/my/beers">My Beers</Link>
                      </div>

                      <Button
                        borderless
                        isLoading={isLoading}
                        onClick={handleLogout}
                      >
                        Log out
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </Dropdown>
        ) : (
          !isLoading && (
            <>
              <ButtonLink borderless href="/login">
                Log in
              </ButtonLink>

              <ButtonLink href="/signup">Sign up</ButtonLink>
            </>
          )
        )}
      </div>
    </nav>
  );
};

export default Navigation;

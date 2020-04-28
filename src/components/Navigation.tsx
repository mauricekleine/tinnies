import { faBeer, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NextLink from "next/link";
import React, { useRef, useState } from "react";

import { useUser } from "../hooks/hooks";
import useFetch from "../hooks/useFetch";
import useOnClickOutside from "../hooks/useOnClickOutside";

import Avatar from "./ui/Avatar";
import { Button, ButtonLink } from "./ui/Buttons";
import { Link } from "./ui/Typography";
import colors from "./ui/colors";

const Navigation = () => {
  const { del } = useFetch("/api/logout");
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, user } = useUser();

  const handleLogout = async () => {
    await del();

    mutate(null);
  };

  const onToggle = () => setIsOpen(!isOpen);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <nav
      className={`bg-${colors.primary} border-b-2 border-${colors.primaryAccent} flex items-center justify-between px-6 py-4`}
    >
      <div className="flex">
        <NextLink href="/">
          <a className={`flex items-center text-${colors.white} mr-4`}>
            <FontAwesomeIcon
              className="h-8 mr-1 w-8 transform -rotate-45"
              icon={faBeer}
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
          <div ref={dropdownRef}>
            <div className="py-2" onClick={onToggle}>
              <Avatar />
            </div>

            {isOpen && (
              <div className="absolute bg-white border mr-6 mt-0 p-4 right-0 rounded shadow-xl w-48">
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

                  <Button borderless onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <ButtonLink borderless href="/login">
              Log in
            </ButtonLink>

            <ButtonLink href="/signup">Sign up</ButtonLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

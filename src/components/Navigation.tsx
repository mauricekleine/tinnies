import { faBeer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

import { useUser } from "../utils/hooks";
import useFetch from "../utils/useFetch";

import { Button, ButtonLink } from "./ui/Buttons";
import colors from "./ui/colors";

const Navigation = () => {
  const { del } = useFetch("/api/logout");
  const { mutate, user } = useUser();

  const handleLogout = async () => {
    await del();

    mutate(null);
  };

  return (
    <nav
      className={`bg-${colors.primary} border-b-2 border-${colors.primaryAccent}  flex items-center justify-between px-6 py-4`}
    >
      <div className="flex">
        <Link href="/">
          <a className={`flex items-center text-${colors.white} mr-8`}>
            <FontAwesomeIcon
              className="h-8 mr-1 w-8 transform -rotate-45"
              icon={faBeer}
            />

            <span className="font-semibold text-xl">Tinnies</span>
          </a>
        </Link>

        {/* {user && (
          <ButtonLink borderless to="/home">
            Home
          </ButtonLink>
        )} */}
      </div>

      <div>
        {user ? (
          <>
            <span className={`hidden md:inline-block mx-2 text-${colors.white}`}>{user.email}</span>
            <Button onClick={handleLogout}>Log out</Button>
          </>
        ) : (
          <>
            <ButtonLink borderless to="/login">
              Log in
            </ButtonLink>
            <ButtonLink to="/signup">Sign up</ButtonLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

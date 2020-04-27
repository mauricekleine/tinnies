import { faBeer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

import { useUser } from "../utils/hooks";
import useFetch from "../utils/useFetch";

import { Button, ButtonLink } from "./ui/Buttons";

const Navigation = () => {
  const { del } = useFetch("/api/logout");
  const { mutate, user } = useUser();

  const handleLogout = async () => {
    await del();

    mutate(null);
  };

  return (
    <nav className="bg-orange-500 border-b-4 border-orange-600 flex items-center justify-between px-6 py-4">
      <div className="flex">
        <Link href="/">
          <a className="flex items-center text-white mr-8">
            <FontAwesomeIcon
              className="h-8 mr-1 w-8 transform -rotate-45"
              icon={faBeer}
            />

            <span className="font-semibold text-xl tracking-tight">
              Tinnies
            </span>
          </a>
        </Link>

        {user && <ButtonLink borderless to="/home">Home</ButtonLink>}
        {user && <ButtonLink borderless to="/home">My Beers</ButtonLink>}
      </div>

      <div>
        {user ? (
          <>
            <span className="mx-2 text-sm text-white tracking-tight">{user.email}</span>
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

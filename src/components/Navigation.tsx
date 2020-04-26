import { faBeer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { useUser } from "../utils/hooks";
import useFetch from "../utils/useFetch";

import { Button, ButtonLink } from "./ui/Buttons";

const Navigation = () => {
  const { del } = useFetch("/api/logout");
  const [user, { mutate }] = useUser();

  const handleLogout = async () => {
    await del();

    mutate(null);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-orange-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <FontAwesomeIcon className="fill-current h-8 w-8 mr-2" icon={faBeer} />

        <span className="font-semibold text-xl tracking-tight">Tinnies</span>
      </div>

      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>

            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        {user ? (
          <>
            <span>{user.email}</span>
            <Button onClick={handleLogout} text="Log out" />
          </>
        ) : (
          <>
            <ButtonLink to="/signup" text="Sign up" />
            <ButtonLink to="/login" text="Log in" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

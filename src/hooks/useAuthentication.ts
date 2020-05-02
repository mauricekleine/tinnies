import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { UserDocument } from "../models/user";
import { READ_MY_PROFILE_RESOURCE } from "../utils/endpoints";

import useFetch from "./useFetch";

const UNAUTHENTICATED_ROUTES = ["/", "/login", "/signup"];

const useAuthentication = () => {
  const { data: user, get, isFetching } = useFetch<UserDocument>(
    READ_MY_PROFILE_RESOURCE,
    { getOnInit: true, getOnVisibilityChange: true }
  );
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const redirectIfNeeded = async () => {
      const isPublicRoute = UNAUTHENTICATED_ROUTES.includes(router.route);
      const fallback = isPublicRoute ? "/home" : "/";

      const redirect = async () => {
        setIsRedirecting(true);
        await router.replace(fallback);
        setIsRedirecting(false);
      };

      if (!user) {
        const { status } = await get();

        if (status === 401 && !isPublicRoute) {
          redirect();
        }
      }

      if (isPublicRoute && user) {
        redirect();
      }
    };

    redirectIfNeeded();
  }, [get, isRedirecting, router, user]);

  return !isFetching && !isRedirecting;
};

export default useAuthentication;

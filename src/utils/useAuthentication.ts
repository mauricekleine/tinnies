import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { User } from "../models/user";
import { CURRENT_USER_RESOURCE } from "../utils/resources";

import useFetch from "./useFetch";

const UNAUTHENTICATED_ROUTES = ["/", "/login", "/signup"];

const useAuthentication = () => {
  const { data: user, get, isLoading, status } = useFetch<User>(
    CURRENT_USER_RESOURCE,
    { getOnInit: true, getOnVisibilityChange: true }
  );

  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const isPublicRoute = UNAUTHENTICATED_ROUTES.includes(router.route);
    const fallback = isPublicRoute ? "/home" : "/";

    const redirect = async () => {
      setIsRedirecting(true);
      await router.replace(fallback);
      setIsRedirecting(false);
    };

    if (!isPublicRoute && (status === 401 || !user)) {
      redirect();
    }

    if (isPublicRoute && user) {
      redirect();
    }
  }, [get, isLoading, isRedirecting, router, status, user]);

  return { isLoading, isRedirecting, user };
};

export default useAuthentication;

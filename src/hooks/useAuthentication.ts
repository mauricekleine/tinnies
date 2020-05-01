import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { UserDocument } from "../models/user";
import { READ_MY_PROFILE_RESOURCE } from "../utils/endpoints";

import useFetch from "./useFetch";
import useUser from "./useUser";

const UNAUTHENTICATED_ROUTES = ["/", "/login", "/signup"];

const useAuthentication = () => {
  const { get, isFetching } = useFetch<UserDocument>(READ_MY_PROFILE_RESOURCE);
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { mutate, user } = useUser();

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
        try {
          const { json } = await get();
          await mutate(json);
        } catch (e) {
          if (!isPublicRoute) {
            redirect();
          }
        }
      }

      if (isPublicRoute && user) {
        redirect();
      }
    };

    redirectIfNeeded();
  }, [get, isRedirecting, mutate, router, user]);

  return !isFetching && !isRedirecting;
};

export default useAuthentication;

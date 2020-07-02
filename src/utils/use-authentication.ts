import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { ApolloClient, gql } from "apollo-boost";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Maybe, User } from "../types/graphql";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      email
      id
      name
    }
  }
`;

const UNAUTHENTICATED_ROUTES = ["/", "/login", "/signup"];

const useAuthentication = () => {
  const client: ApolloClient<any> = useApolloClient();
  const { data: localData, loading: isLoggedInIsLoading } = useQuery<{
    isLoggedIn?: boolean;
  }>(IS_LOGGED_IN);
  const { data, loading: currentUserIsLoading, refetch } = useQuery<{
    currentUser: User;
  }>(CURRENT_USER, {
    onCompleted: (data) => {
      if (data && data.currentUser) {
        client.writeData({ data: { isLoggedIn: true } });
      }
    },
  });

  const isLoading = currentUserIsLoading || isLoggedInIsLoading;
  const isLoggedIn = localData && localData.isLoggedIn;
  const currentUser = data && data.currentUser;

  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(isLoading);

  const logout = () => {
    client.resetStore();
    localStorage.removeItem("token");
    router.replace("/");
  };

  useEffect(() => {
    if (isLoggedIn && !currentUser) {
      refetch();
    }
  }, [currentUser, isLoggedIn, refetch]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const redirect = async () => {
      const isPublicRoute = UNAUTHENTICATED_ROUTES.includes(router.route);
      const fallback = isPublicRoute ? "/home" : "/";
      const shouldRedirect = isPublicRoute === Boolean(isLoggedIn);

      if (shouldRedirect) {
        setIsRedirecting(true);
        await router.replace(fallback);
      }

      setIsRedirecting(false);
    };

    redirect();
  }, [isLoggedIn, isLoading, isRedirecting, router]);

  return { currentUser, isRedirecting, localData, logout };
};

export default useAuthentication;

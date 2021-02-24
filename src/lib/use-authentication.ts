import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { User } from "../types/graphql";

export const CURRENT_USER_QUERY = gql`
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
  const client = useApolloClient();
  const router = useRouter();

  const isPublicRoute = UNAUTHENTICATED_ROUTES.includes(router.route);
  const fallback = isPublicRoute ? "/home" : "/";

  const { data, loading } = useQuery<{
    currentUser: User;
  }>(CURRENT_USER_QUERY, {
    onCompleted: (data) => {
      if (data?.currentUser && isPublicRoute) {
        router.replace(fallback);
      }
    },
    skip: process.browser && !localStorage.getItem("token"),
  });

  const currentUser = data && data.currentUser;

  const logout = () => {
    client.resetStore();
    localStorage.removeItem("token");
    router.replace("/");
  };

  return { currentUser, isLoading: loading, logout };
};

export default useAuthentication;

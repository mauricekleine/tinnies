import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";

let apolloClient;

const createApolloClient = () => {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_URL,
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        CodenamesGame: {
          fields: {
            startedAt: {
              read: (startedAt) => new Date(startedAt),
            },
            updatedAt: {
              read: (updatedAt) => new Date(updatedAt),
            },
          },
        },
      },
    }),
    link: authLink.concat(httpLink),
    ssrMode: typeof window === "undefined",
  });
};

export const initializeApollo = (
  initialState: NormalizedCacheObject = null
) => {
  const _apolloClient: ApolloClient<NormalizedCacheObject> =
    apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === "undefined") {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
};

export const useApollo = (initialState: NormalizedCacheObject) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
};

import fetch from "isomorphic-unfetch";
import { Reducer, useCallback, useEffect, useReducer } from "react";

import Action, {
  isErrorAction,
  isFetchAction,
  isSuccessAction,
} from "../utils/actions";
import State, { createInitialState } from "../utils/state";

import useCache, { Cache } from "./useCache";

const createReducer = () => <T>(state: State<T>, action: Action<T>) => {
  if (isErrorAction(action)) {
    return {
      ...state,
      error: action.payload.error,
      isLoading: false,
      status: action.payload.status,
    };
  }

  if (isFetchAction(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (isSuccessAction(action)) {
    return {
      ...state,
      data: action.payload.data,
      isLoading: false,
      status: action.payload.status,
    };
  }

  return state;
};

const getJson = async <T>(res: Response, cache: Cache<T>) => {
  try {
    const data: T = await res.json();

    cache.notify({
      payload: {
        data,
        status: res.status,
      },
      type: "success",
    });

    return { data, status: res.status };
  } catch (e) {
    cache.notify({
      payload: { error: e, status: res.status },
      type: "error",
    });

    return { status: res.status };
  }
};

type UseFetchOptions = {
  cacheKey?: string;
  getOnInit?: boolean;
  getOnVisibilityChange?: boolean;
};

const useFetch = <T>(url: string, options: UseFetchOptions = {}) => {
  // Initialize cache
  const cacheKey = options.cacheKey || url;
  const cache = useCache<T>(cacheKey);

  // Create reducer and initial state based on cache
  const cached = cache.get();
  const initialState = createInitialState(cached, options.getOnInit);
  const reducer = createReducer();

  // Initialize the reducer
  const [{ data, error, isLoading, status }, dispatch] = useReducer<
    Reducer<State<T>, Action<T>>
  >(reducer, initialState);

  // Delete request handler
  const del = useCallback(
    (id?: string) => {
      const deleteRequestHandler = async () => {
        if (id && Array.isArray(data)) {
          const optimisticData = (data.filter(
            ({ _id }) => _id !== id
          ) as unknown) as T;

          cache.notify({
            payload: {
              data: optimisticData,
              status: 200,
            },
            type: "success",
          });
        }

        cache.notify({
          type: "fetching",
        });

        const options: RequestInit = {
          headers: { "Content-Type": "application/json" },
          method: "DELETE",
        };

        const res = await fetch(`${url}/${id}`, options);

        if (res.status === 204) {
          cache.notify({
            payload: {
              data: undefined,
              status: res.status,
            },
            type: "success",
          });

          return { status: res.status };
        }

        return getJson<T>(res, cache);
      };

      return deleteRequestHandler();
    },
    [data, url]
  );

  // GET request handler
  const get = useCallback(() => {
    const getRequestHandler = async () => {
      cache.notify({
        type: "fetching",
      });

      const options: RequestInit = {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      };

      const res = await fetch(url, options);

      return getJson<T>(res, cache);
    };

    return getRequestHandler();
  }, [url]);

  // POST request handler
  const post = useCallback(
    (body: object) => {
      const postRequestHandler = async () => {
        cache.notify({
          type: "fetching",
        });

        const options: RequestInit = {
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        };

        const res = await fetch(url, options);

        return getJson<T>(res, cache);
      };

      return postRequestHandler();
    },
    [url]
  );

  // Subscribe dispatch to the cache
  useEffect(() => {
    cache.subscribe(dispatch);

    return () => {
      cache.unsubscribe(dispatch);
    };
  }, [cache]);

  // Revalidate on focus
  useEffect(() => {
    if (options.getOnVisibilityChange) {
      const onVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          get();
        }
      };

      window.addEventListener("visibilitychange", onVisibilityChange, false);

      return () => {
        window.removeEventListener(
          "visibilitychange",
          onVisibilityChange,
          false
        );
      };
    }
  }, [get, options.getOnVisibilityChange]);

  // Fetch data on init
  useEffect(() => {
    if (options.getOnInit) {
      get();
    }
  }, [get, options.getOnInit]);

  return {
    data,
    del,
    error,
    get,
    isLoading,
    post,
    status,
  };
};

export default useFetch;

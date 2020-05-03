import fetch from "isomorphic-unfetch";
import { Reducer, useCallback, useEffect, useReducer } from "react";

import Action, {
  isErrorAction,
  isFetchAction,
  isSuccessAction,
} from "../utils/actions";
import State, { createInitialState } from "../utils/state";

import useCache, { UseCache } from "./useCache";

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

type UseFetchOptions = {
  cacheKey?: string;
  getOnInit?: boolean;
  getOnVisibilityChange?: boolean;
};

// Http request handler creator
const createRequestHandler = <T>(
  method: RequestInit["method"],
  url: string,
  cache: UseCache<T>
) => async (options?: Omit<RequestInit, "headers" | "method">) => {
  cache.notify({
    type: "fetching",
  });

  const opts = {
    ...options,
    headers: { "Content-Type": "application/json" },
    method,
  };

  if (options && options.body) {
    opts.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, opts);

  if (method === "DELETE" && res.status === 204) {
    cache.notify({
      payload: {
        data: undefined,
        status: res.status,
      },
      type: "success",
    });

    return { status: res.status };
  }

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

  // Http request handlers
  const del = useCallback(createRequestHandler<T>("DELETE", url, cache), [url]);
  const get = useCallback(createRequestHandler<T>("GET", url, cache), [url]);
  const post = useCallback(createRequestHandler<T>("POST", url, cache), [url]);

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

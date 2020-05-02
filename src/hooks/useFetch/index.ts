import fetch from "isomorphic-unfetch";
import { Reducer, useEffect, useReducer, useRef } from "react";

import Action, {
  isErrorAction,
  isFetchAction,
  isSuccessAction,
} from "./actions";
import cache from "./cache";
import State, { createInitialState } from "./state";

const createReducer = () => <T>(state: State<T>, action: Action<T>) => {
  if (isErrorAction(action)) {
    return {
      data: undefined,
      error: action.payload.error,
      isFetching: false,
      status: undefined,
    };
  }

  if (isFetchAction(action)) {
    return {
      data: undefined,
      error: undefined,
      isFetching: true,
      status: undefined,
    };
  }

  if (isSuccessAction(action)) {
    return {
      data: action.payload.data,
      error: undefined,
      isFetching: false,
      status: action.payload.status,
    };
  }

  return state;
};

type UseFetchOptions = {
  cacheKey?: RequestInfo;
  getOnInit?: boolean;
  getOnVisibilityChange?: boolean;
};

const useFetch = <T>(url: RequestInfo, options: UseFetchOptions = {}) => {
  // Create reducer and initial state based on cache
  const cacheKey = options.cacheKey || url;
  const cached = cache.get<T>(cacheKey);
  const initialState = createInitialState(cached);
  const reducer = createReducer();

  // Initialize the reducer
  const [{ data, error, isFetching, status }, dispatch] = useReducer<
    Reducer<State<T>, Action<T>>
  >(reducer, initialState);

  // Http request handler creator
  const createRequestHandler = (method: RequestInit["method"]) => async (
    options?: Omit<RequestInit, "headers" | "method">
  ) => {
    cache.notify<T>(cacheKey, {
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
      cache.notify<T>(cacheKey, {
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

      cache.notify<T>(cacheKey, {
        payload: {
          data,
          status: res.status,
        },
        type: "success",
      });

      return { data, status: res.status };
    } catch (e) {
      cache.notify<T>(cacheKey, {
        payload: { error: e },
        type: "error",
      });

      return { status: res.status };
    }
  };

  // Http request handlers
  const del = useRef(createRequestHandler("DELETE")).current;
  const get = useRef(createRequestHandler("GET")).current;
  const post = useRef(createRequestHandler("POST")).current;

  // Subscribe dispatch to the cache
  useEffect(() => {
    cache.subscribe<Action<T>>(cacheKey, dispatch);

    return () => {
      cache.unsubscribe<Action<T>>(cacheKey, dispatch);
    };
  }, [cacheKey]);

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
    isFetching,
    post,
    status,
  };
};

export default useFetch;

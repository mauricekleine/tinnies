import fetch from "isomorphic-unfetch";
import { Reducer, useReducer } from "react";

type Action = {
  type: "error" | "fetching" | "success";
};

type State<T> = {
  error: Error;
  isFetching: boolean;
  json: T;
  status: Response["status"];
};

type ErrorAction = {
  payload: {
    error: Error;
  };
} & Action;

type SuccessAction<T> = {
  payload: {
    json: State<T>["json"];
    status: State<T>["status"];
  };
} & Action;

const isErrorAction = (action: Action): action is ErrorAction => {
  return action.type === "error";
};

const isSuccessAction = <T>(action: Action): action is SuccessAction<T> => {
  return action.type === "success";
};

const initialState = {
  error: null,
  isFetching: false,
  json: null,
  status: null,
};

const reducer = <T>(
  state: State<T>,
  action: Action | ErrorAction | SuccessAction<T>
) => {
  if (isErrorAction(action)) {
    return {
      error: action.payload.error,
      isFetching: false,
      json: null,
      status: null,
    };
  }

  if (isSuccessAction(action)) {
    return {
      error: null,
      isFetching: false,
      json: action.payload.json,
      status: action.payload.status,
    };
  }

  return {
    error: null,
    isFetching: true,
    json: null,
    status: null,
  };
};

const useFetch = <T>(url: RequestInfo) => {
  const [{ error, isFetching, json, status }, dispatch] = useReducer<
    Reducer<State<T>, Action | ErrorAction | SuccessAction<T>>
  >(reducer, initialState);

  const customFetch = (method: RequestInit["method"]) => async (
    options?: Omit<RequestInit, "headers" | "method">
  ) => {
    try {
      dispatch({
        type: "fetching",
      });

      const res = await fetch(url, {
        ...options,
        headers: { "Content-Type": "application/json" },
        method,
      });

      const json: T = await res.json();

      dispatch({
        payload: {
          json,
          status: res.status,
        },
        type: "success",
      });

      return { json, status: res.status };
    } catch (e) {
      dispatch({
        payload: { error: e },
        type: "error",
      });
    }
  };

  return {
    del: customFetch("DELETE"),
    error,
    get: customFetch("GET"),
    isFetching,
    json,
    post: customFetch("POST"),
    status,
  };
};

export default useFetch;

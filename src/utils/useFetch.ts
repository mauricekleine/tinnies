import { useReducer } from "react";

interface State {
  error: Error;
  isFetching: boolean;
  json: any;
  status: Response["status"];
}

const initialState = {
  error: null,
  isFetching: false,
  json: null,
  status: null,
};

const reducer = (_, action) => {
  switch (action.type) {
    case "error":
      return {
        error: action.error,
        isFetching: false,
        json: null,
        status: null,
      };
    case "fetching":
      return {
        error: null,
        isFetching: true,
        json: null,
        status: null,
      };
    case "success":
      return {
        error: null,
        isFetching: false,
        json: action.json,
        status: action.status,
      };
    default:
      throw new Error();
  }
};

const useFetch = (url: RequestInfo) => {
  const [{ error, isFetching, json }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const customFetch = (method: RequestInit["method"]) => async (
    options?: Omit<RequestInit, "headers" | "method">
  ) => {
    try {
      dispatch({
        payload: {
          isFetching: true,
        },
        type: "fetching",
      });

      const res = await fetch(url, {
        ...options,
        headers: { "Content-Type": "application/json" },
        method,
      });

      const json = await res.json();

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
        type: "success",
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

import State, { Status } from "./state";

export type ErrorAction = {
  payload: {
    error: Error;
    status: Status;
  };
  type: "error";
};

export type FetchAction = {
  type: "fetching";
};

export type SuccessAction<T> = {
  payload: {
    data: State<T>["data"];
    status: Status;
  };
  type: "success";
};

type Action<T> = ErrorAction | FetchAction | SuccessAction<T>;

export const isErrorAction = <T>(action: Action<T>): action is ErrorAction => {
  return action.type === "error";
};

export const isFetchAction = <T>(action: Action<T>): action is FetchAction => {
  return action.type === "error";
};

export const isSuccessAction = <T>(
  action: Action<T>
): action is SuccessAction<T> => {
  return action.type === "success";
};

export default Action;

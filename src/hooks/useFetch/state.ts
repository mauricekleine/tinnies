type State<T> = {
  data: T;
  error: Error;
  isFetching: boolean;
  status: Response["status"];
};

export const createInitialState = <T>(cached: T) =>
  ({
    data: cached,
    error: undefined,
    isFetching: false,
    status: undefined,
  } as State<T>);

export default State;

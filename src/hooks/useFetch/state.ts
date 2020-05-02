type State<T> = {
  data: T;
  error: Error;
  isFetching: boolean;
  status: Response["status"];
};

export const createInitialState = <T>(cached: T, getOnInit = false) =>
  ({
    data: cached,
    error: undefined,
    isFetching: getOnInit,
    status: undefined,
  } as State<T>);

export default State;

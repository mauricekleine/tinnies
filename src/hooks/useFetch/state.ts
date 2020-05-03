type State<T> = {
  data: T;
  error: Error;
  isLoading: boolean;
  status: Response["status"];
};

export const createInitialState = <T>(cached: T, isInitialyLoading = false) =>
  ({
    data: cached,
    error: undefined,
    isLoading: isInitialyLoading,
    status: undefined,
  } as State<T>);

export default State;

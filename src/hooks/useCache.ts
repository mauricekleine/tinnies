// import { Dispatch } from "react";

import { Dispatch, useCallback } from "react";

import Action, { isSuccessAction } from "../utils/actions";

export type CacheKey = string;

export type UseCache<T> = {
  del: () => boolean;
  get: () => T;
  notify: (action: Action<T>) => void;
  set: (value: T) => Map<CacheKey, T>;
  subscribe: (
    dispatch: Dispatch<Action<T>>
  ) => Map<CacheKey, Dispatch<Action<T>>[]>;
  unsubscribe: (
    dispatch: Dispatch<Action<T>>
  ) => Map<CacheKey, Dispatch<Action<T>>[]>;
};

const Cache = new Map<CacheKey, unknown>();
const Dispatchers = new Map<CacheKey, Dispatch<Action<unknown>>[]>();

const useCache = <T>(key: CacheKey): UseCache<T> => {
  const cache = Cache as Map<CacheKey, T>;
  const dispatchers = Dispatchers as Map<CacheKey, Dispatch<Action<T>>[]>;

  const del = useCallback(() => cache.delete(key), [cache, key]);
  const get = useCallback(() => cache.get(key), [cache, key]);
  const set = useCallback((value: T) => cache.set(key, value), [cache, key]);

  const notify = useCallback(
    (action: Action<T>) => {
      const dispatchersForKey = dispatchers.get(key);

      if (dispatchersForKey) {
        dispatchersForKey.forEach((dispatch) => dispatch(action));
      }

      if (isSuccessAction(action)) {
        set(action.payload.data);
      }
    },
    [dispatchers, key, set]
  );

  const subscribe = useCallback(
    (dispatch: Dispatch<Action<T>>) => {
      const dispatchersForKey = dispatchers.get(key);

      if (dispatchersForKey) {
        return dispatchers.set(key, [...dispatchersForKey, dispatch]);
      }

      return dispatchers.set(key, [dispatch]);
    },
    [dispatchers, key]
  );

  const unsubscribe = useCallback(
    (dispatch: Dispatch<Action<T>>) => {
      const dispatchersForKey = dispatchers.get(key);

      if (dispatchersForKey) {
        const result = dispatchersForKey.filter((d) => d !== dispatch);

        return dispatchers.set(key, result);
      }
    },
    [dispatchers, key]
  );

  return { del, get, notify, set, subscribe, unsubscribe };
};

export default useCache;

import { Dispatch, useCallback } from "react";

import Action, { isSuccessAction } from "../utils/actions";
import isDev from "../utils/isDev";

declare global {
  interface Window {
    Tinnies: { Cache: typeof Cache };
  }
}

export type CacheKey = string;

export type Cache<T> = {
  get: () => T;
  notify: (action: Action<T>) => void;
  set: (value: T) => { [cacheKey in CacheKey]: T };
  subscribe: (
    dispatch: Dispatch<Action<T>>
  ) => Map<CacheKey, Dispatch<Action<T>>[]>;
  unsubscribe: (
    dispatch: Dispatch<Action<T>>
  ) => Map<CacheKey, Dispatch<Action<T>>[]>;
};

const Cache: { [cacheKey in CacheKey]: unknown } = {};
const Dispatchers = new Map<CacheKey, Dispatch<Action<unknown>>[]>();

if (isDev && typeof window !== "undefined") {
  window.Tinnies = { Cache };
}

const useCache = <T>(key: CacheKey): Cache<T> => {
  const cache = Cache as { [cacheKey in CacheKey]: T };
  const dispatchers = Dispatchers as Map<CacheKey, Dispatch<Action<T>>[]>;

  const get = useCallback(() => cache[key], [cache, key]);
  const set = useCallback(
    (value: T) => {
      cache[key] = value;

      return cache;
    },
    [cache, key]
  );

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

  return { get, notify, set, subscribe, unsubscribe };
};

export default useCache;

import { Dispatch } from "react";

import Action, { isSuccessAction } from "./actions";

class Cache {
  private cache = new Map<string, any>();
  private dispatchers = new Map<string, Dispatch<any>[]>();

  // cache setters and getters

  public delete = (key) => this.cache.delete(key);
  public get = <T>(key) => this.cache.get(key) as T;
  public set = (key, value) => this.cache.set(key, value);

  // event handling and subscription

  public notify = <T>(key, action: Action<T>) => {
    const dispatchers = this.dispatchers.get(key);

    if (isSuccessAction(action)) {
      this.set(key, action.payload.data);
    }

    if (dispatchers) {
      dispatchers.forEach((dispatch) => dispatch(action));
    }
  };

  public subscribe = <T>(key, dispatch: Dispatch<T>) => {
    const dispatchers = this.dispatchers.get(key);

    if (dispatchers) {
      return this.dispatchers.set(key, [...dispatchers, dispatch]);
    }

    return this.dispatchers.set(key, [dispatch]);
  };

  public unsubscribe = <T>(key, dispatch: Dispatch<T>) => {
    const dispatchers = this.dispatchers.get(key);

    if (dispatchers) {
      const result = dispatchers.filter((d) => d !== dispatch);

      return this.dispatchers.set(key, result);
    }
  };

  // sweep

  public sweep = (key) => {
    this.delete(key);
    this.dispatchers.delete(key);
  };
}

const cache = new Cache();

export default cache;

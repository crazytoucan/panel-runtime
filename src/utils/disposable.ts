import { pull } from "./collectionUtils";
import { Dispose } from "./Dispose";

export interface Disposable {
  (): void;
  add(...callbacks: Dispose[]): void;
  remove(callback: Dispose): void;
}

export function disposable(...initialCallbacks: Dispose[]) {
  let callbacksStorage: Dispose[] = [...initialCallbacks];
  const dispose = (() => {
    const _callbacks = callbacksStorage;
    callbacksStorage = [];
    for (const callback of _callbacks) {
      try {
        callback();
      } catch (e) {
        console.error(e);
      }
    }
  }) as Disposable;

  dispose.add = (...nextCallbacks) => {
    callbacksStorage.push(...nextCallbacks);
  };

  dispose.remove = (callback) => {
    pull(callbacksStorage, callback);
  };

  return dispose;
}

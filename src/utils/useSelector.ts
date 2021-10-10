import { useContext, useLayoutEffect, useReducer, useRef } from "react";
import { STORE_CONTEXT } from "../storeContext";
import { RootState } from "../types";
import { assertNotNull } from "./assertUtils";

export function useSelector<U>(selector: (t: RootState) => U) {
  const store = useContext(STORE_CONTEXT);
  assertNotNull(store);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  let ref = useRef<{
    lastValue: U;
    lastSelector: typeof selector;
    isUpdateQueued: boolean;
  }>({} as any).current;

  ref.isUpdateQueued = false;
  ref.lastSelector = selector;
  ref.lastValue = selector(store.state);

  useLayoutEffect(() => {
    return store.subscribe((nextState) => {
      if (ref.isUpdateQueued) {
        return;
      }

      const nextValue = ref.lastSelector(nextState);
      if (nextValue !== ref.lastValue) {
        ref.isUpdateQueued = true;
        forceUpdate();
      }
    });
  }, [ref, store]);

  return ref.lastValue;
}

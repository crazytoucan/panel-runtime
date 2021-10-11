import { useContext, useLayoutEffect, useReducer, useRef } from "react";
import { DRAG_CONTEXT } from "../dragContext";
import { MAIN_CONTEXT } from "../mainContext";
import { DragState, MainState } from "../types";
import { assertNotNull } from "./assertUtils";
import { Store } from "./Store";

function useSelector<T, U>(store: Store<T>, selector: (t: T) => U) {
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

export function useMainSelector<U>(selector: (t: MainState) => U) {
  const mainStore = useContext(MAIN_CONTEXT);
  assertNotNull(mainStore);
  return useSelector(mainStore, selector);
}

export function useDragSelector<U>(selector: (t: DragState) => U) {
  const dragStore = useContext(DRAG_CONTEXT);
  assertNotNull(dragStore);
  return useSelector(dragStore, selector);
}

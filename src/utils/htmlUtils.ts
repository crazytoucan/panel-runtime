type ElementLike = HTMLElement | Window | Document;
type EventMap<T extends ElementLike> = T extends HTMLElement
  ? HTMLElementEventMap
  : T extends Window
  ? WindowEventMap
  : T extends Document
  ? DocumentEventMap
  : never;

export function subscribeEventListener<T extends ElementLike, K extends keyof EventMap<T>>(
  element: T,
  type: K,
  callback: (evt: EventMap<T>[K]) => void,
) {
  (element as any).addEventListener(type, callback);
  return () => {
    (element as any).removeEventListener(type, callback);
  };
}

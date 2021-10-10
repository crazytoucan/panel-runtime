import update, { Spec } from "immutability-helper";

export function updateWhere<T>(array: T[], predicate: (t: T) => boolean, spec: Spec<T>) {
  let nextArray: T[] | null = null;
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      nextArray ??= [...array];
      nextArray[i] = update(array[i], spec);
    }
  }

  return nextArray ?? array;
}

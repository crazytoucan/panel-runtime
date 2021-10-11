import { DragState, MainState } from "./types";
import { Store } from "./utils/Store";

export class Actions {
  constructor(private mainStore: Store<MainState>, private dragStore: Store<DragState>) {}

  startDrag() {
    this.dragStore.update({
      isDragging: {
        $set: true,
      },
    });
  }

  endDrag() {
    this.dragStore.update({
      isDragging: {
        $set: false,
      },
    });
  }
}

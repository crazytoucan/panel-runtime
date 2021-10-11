import { setDragData } from "./dragDataProtocol";
import { DragState, MainState } from "./types";
import { disposable } from "./utils/disposable";
import { subscribeEventListener } from "./utils/htmlUtils";
import { Store } from "./utils/Store";

export class Actions {
  public dispose = disposable();

  constructor(private mainStore: Store<MainState>, private dragStore: Store<DragState>) {}

  initialize() {
    this.dispose.add(
      subscribeEventListener(document, "dragenter", (evt) => {
        evt.preventDefault();
      }),
      subscribeEventListener(document, "dragover", (evt) => {
        if (evt.dataTransfer == null) {
          return;
        }

        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
      }),
      subscribeEventListener(document, "drop", (evt) => {
        console.log("drop", evt);
      }),
    );
  }

  startDrag(dataTransfer: DataTransfer) {
    setDragData(dataTransfer, this.mainStore.state.sessionId);
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

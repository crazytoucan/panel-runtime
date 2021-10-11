import React, { ReactChild } from "react";
import ReactDOM from "react-dom";
import { RootComponent } from "./components/RootComponent";
import { ColumnId } from "./constants";
import { DRAG_CONTEXT } from "./dragContext";
import { MAIN_CONTEXT } from "./mainContext";
import { DragState, MainState } from "./types";
import { Store } from "./utils/Store";
import { updateWhere } from "./utils/updateUtils";

export type PanelLocationArg = "left" | "right";

export interface OpenPanelOptions {
  title: string;
  element: ReactChild | null;
  preferredSide?: PanelLocationArg;
}

export class PanelRuntime {
  private mountEl: HTMLElement | null = null;
  private counter = 10;
  private mainStore = new Store<MainState>({
    columnStates: [
      {
        columnId: ColumnId.LEFT,
        panelIds: [],
      },
      {
        columnId: ColumnId.RIGHT,
        panelIds: [],
      },
    ],
    panelStates: [],
  });

  private dragStore = new Store<DragState>({
    isDragging: false,
  });

  openPanel(options: OpenPanelOptions) {
    const side = options.preferredSide ?? "left";
    const columnId = side === "left" ? ColumnId.LEFT : ColumnId.RIGHT;
    const panelId = this.nextId();
    const htmlElement = document.createElement("div");

    this.mainStore.update({
      columnStates: (columnStates) =>
        updateWhere(columnStates, (c) => c.columnId === columnId, {
          panelIds: {
            $push: [panelId],
          },
        }),
      panelStates: {
        $push: [
          {
            panelId,
            htmlElement,
            reactChild: options.element,
            title: options.title,
          },
        ],
      },
    });
  }

  mount(el: HTMLElement) {
    this.mountEl = el;
    ReactDOM.render(
      <MAIN_CONTEXT.Provider value={this.mainStore}>
        <DRAG_CONTEXT.Provider value={this.dragStore}>
          <RootComponent />
        </DRAG_CONTEXT.Provider>
      </MAIN_CONTEXT.Provider>,
      el,
    );
  }

  unmount() {
    if (this.mountEl !== null) {
      const el = this.mountEl;
      this.mountEl = null;
      ReactDOM.unmountComponentAtNode(el);
    }
  }

  private nextId() {
    return String(this.counter++);
  }
}

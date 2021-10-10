import React, { ReactChild } from "react";
import ReactDOM from "react-dom";
import { RootComponent } from "./components/RootComponent";
import { ColumnId } from "./constants";
import { STORE_CONTEXT } from "./storeContext";
import { RootState } from "./types";
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
  private store = new Store<RootState>({
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

  openPanel(options: OpenPanelOptions) {
    const side = options.preferredSide ?? "left";
    const columnId = side === "left" ? ColumnId.LEFT : ColumnId.RIGHT;
    const panelId = this.nextId();
    const htmlElement = document.createElement("div");

    this.store.update({
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
      <STORE_CONTEXT.Provider value={this.store}>
        <RootComponent />
      </STORE_CONTEXT.Provider>,
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

import React, { ReactChild } from "react";
import ReactDOM from "react-dom";
import { Actions } from "./Actions";
import { ACTIONS_CONTEXT } from "./actionsContext";
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
    sessionId: "0",
    columns: [
      {
        columnId: ColumnId.LEFT,
        panelGroups: [],
      },
      {
        columnId: ColumnId.RIGHT,
        panelGroups: [],
      },
    ],
  });

  private dragStore = new Store<DragState>({
    isDragging: false,
  });

  private actions;

  constructor() {
    this.actions = new Actions(this.mainStore, this.dragStore);
    this.actions.initialize();
  }

  openPanel(options: OpenPanelOptions) {
    const side = options.preferredSide ?? "left";
    const columnId = side === "left" ? ColumnId.LEFT : ColumnId.RIGHT;
    const panelId = this.nextId();
    const panelGroupId = this.nextId();
    const htmlElement = document.createElement("div");

    this.mainStore.update({
      columns: (columnStates) =>
        updateWhere(columnStates, (c) => c.columnId === columnId, {
          panelGroups: {
            $push: [
              {
                panelGroupId,
                panels: [
                  {
                    panelId,
                    htmlElement,
                    reactChild: options.element,
                    title: options.title,
                  },
                ],
              },
            ],
          },
        }),
    });
  }

  mount(el: HTMLElement) {
    this.mountEl = el;
    ReactDOM.render(
      <MAIN_CONTEXT.Provider value={this.mainStore}>
        <DRAG_CONTEXT.Provider value={this.dragStore}>
          <ACTIONS_CONTEXT.Provider value={this.actions}>
            <RootComponent />
          </ACTIONS_CONTEXT.Provider>
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

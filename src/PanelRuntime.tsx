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

export type ColumnAffinity = "left" | "right";

export interface OpenPanelOptions {
  title: string;
  element: ReactChild | null;
  columnAffinity?: ColumnAffinity;
  groupAffinity?: string;
}

export class PanelRuntime {
  private mountEl: HTMLElement | null = null;
  private counter = 10;
  private mainStore = new Store<MainState>({
    sessionId: "0",
    columns: [
      {
        columnId: ColumnId.LEFT,
        groupIds: [],
      },
      {
        columnId: ColumnId.RIGHT,
        groupIds: [],
      },
    ],
    groups: [],
    panels: [],
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
    const side = options.columnAffinity ?? "left";
    const columnId = side === "left" ? ColumnId.LEFT : ColumnId.RIGHT;
    const panelId = this.nextId();
    const groupId = this.nextId();
    const htmlElement = document.createElement("div");

    this.mainStore.update({
      columns: (columns) =>
        updateWhere(columns, (c) => c.columnId === columnId, {
          groupIds: {
            $push: [groupId],
          },
        }),
      groups: {
        $push: [
          {
            groupId,
            panelIds: [panelId],
            selectedPanelId: panelId,
          },
        ],
      },
      panels: {
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

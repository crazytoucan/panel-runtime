import { ReactChild } from "react";

export interface ColumnState {
  columnId: string;
  panelIds: string[];
}

export interface PanelState {
  panelId: string;
  htmlElement: HTMLElement;
  reactChild: ReactChild | null;
}

export interface RootState {
  columnStates: ColumnState[];
  panelStates: PanelState[];
}
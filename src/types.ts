import { ReactChild } from "react";

export interface ColumnState {
  columnId: string;
  panelGroups: PanelGroupState[];
}

export interface PanelState {
  panelId: string;
  htmlElement: HTMLElement;
  reactChild: ReactChild | null;
  title: string;
}

export interface PanelGroupState {
  panelGroupId: string;
  panels: PanelState[];
}

export interface MainState {
  sessionId: string;
  columns: ColumnState[];
}

export interface DragState {
  isDragging: boolean;
}

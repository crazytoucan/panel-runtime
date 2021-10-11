import { ReactChild } from "react";

export interface ColumnState {
  columnId: string;
  groupIds: string[];
}

export interface PanelState {
  panelId: string;
  htmlElement: HTMLElement;
  reactChild: ReactChild | null;
  title: string;
}

export interface GroupState {
  groupId: string;
  panelIds: string[];
  selectedPanelId: string | null;
}

export interface MainState {
  sessionId: string;
  columns: ColumnState[];
  groups: GroupState[];
  panels: PanelState[];
}

export interface DragState {
  isDragging: boolean;
}

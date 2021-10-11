import { createContext } from "react";
import { DragState } from "./types";
import { Store } from "./utils/Store";

export const DRAG_CONTEXT = createContext<Store<DragState> | null>(null);

import { createContext } from "react";
import { MainState } from "./types";
import { Store } from "./utils/Store";

export const MAIN_CONTEXT = createContext<Store<MainState> | null>(null);

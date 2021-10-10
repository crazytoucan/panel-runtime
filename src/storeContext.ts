import { createContext } from "react";
import { RootState } from "./types";
import { Store } from "./utils/Store";

export const STORE_CONTEXT = createContext<Store<RootState> | null>(null);

import { createContext } from "react";
import { Actions } from "./Actions";

export const ACTIONS_CONTEXT = createContext<Actions | null>(null);

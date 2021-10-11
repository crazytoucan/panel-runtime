import { useContext } from "react";
import { ACTIONS_CONTEXT } from "./actionsContext";
import { assertNotNull } from "./utils/assertUtils";

export function useActions() {
  const actions = useContext(ACTIONS_CONTEXT);
  assertNotNull(actions);
  return actions;
}

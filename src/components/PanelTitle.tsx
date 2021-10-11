import React, { Fragment } from "react";
import { useMainSelector } from "../utils/useSelector";

export function PanelTitle({ panelId }: { panelId: string }) {
  const title = useMainSelector(
    (state) => state.panelStates.find((p) => p.panelId === panelId)?.title,
  );

  return <Fragment>{title}</Fragment>;
}

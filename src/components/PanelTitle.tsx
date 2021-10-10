import React, { Fragment } from "react";
import { useSelector } from "../utils/useSelector";

export function PanelTitle({ panelId }: { panelId: string }) {
  const title = useSelector((state) => state.panelStates.find((p) => p.panelId === panelId)?.title);
  return <Fragment>{title}</Fragment>;
}

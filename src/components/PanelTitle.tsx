import React, { Fragment } from "react";
import { useMainSelector } from "../useSelector";

export function PanelTitle({ panelId }: { panelId: string }) {
  const title = useMainSelector((state) => state.panels.find((p) => p.panelId === panelId)?.title);

  return <Fragment>{title}</Fragment>;
}

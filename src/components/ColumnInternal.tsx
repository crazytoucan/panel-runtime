import React, { Fragment } from "react";
import { useSelector } from "../utils/useSelector";
import { PanelInternal } from "./PanelInternal";

export function ColumnInternal({ columnId }: { columnId: string }) {
  const column = useSelector((state) => state.columnStates.find((c) => c.columnId === columnId));
  return (
    <Fragment>
      {column?.panelIds.map((panelId) => (
        <PanelInternal key={panelId} panelId={panelId} />
      ))}
    </Fragment>
  );
}

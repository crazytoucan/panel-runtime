import React, { Fragment } from "react";
import { ColumnId } from "../constants";
import { ColumnInternal } from "./ColumnInternal";
import { PanelMounts } from "./PanelMounts";

export function RootComponent({}: {}) {
  return (
    <Fragment>
      <div>
        <ColumnInternal columnId={ColumnId.LEFT} />
      </div>
      <PanelMounts />
    </Fragment>
  );
}

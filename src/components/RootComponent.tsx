import { css } from "@emotion/css";
import React, { Fragment } from "react";
import { ColumnId } from "../constants";
import { BORDER_COLOR, NEGATIVE_SPACE_COLOR } from "../styles";
import { Column } from "./Column";
import { PanelMounts } from "./PanelMounts";

export function RootComponent({}: {}) {
  return (
    <Fragment>
      <div
        className={css`
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          background: ${NEGATIVE_SPACE_COLOR};
        `}
      >
        <Column
          columnId={ColumnId.LEFT}
          className={css`
            margin-left: 1px;
            margin-right: 1px;
          `}
        />
        <div
          className={css`
            flex: 1 1 auto;
            border: 1px solid ${BORDER_COLOR};
            margin-top: 1px;
            margin-bottom: 1px;
          `}
          style={{ flex: "1 1 auto" }}
        >
          Main
        </div>
        <Column
          columnId={ColumnId.RIGHT}
          className={css`
            margin-left: 1px;
            margin-right: 1px;
          `}
        />
      </div>
      <PanelMounts />
    </Fragment>
  );
}

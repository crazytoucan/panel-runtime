import { css, cx } from "@emotion/css";
import React, { Fragment } from "react";
import { ColumnId } from "../constants";
import { ColumnInternal } from "./ColumnInternal";
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
        `}
      >
        <div
          className={cx(
            css`
              width: 280px;
            `,
            css`
              background: #444;
            `,
          )}
        >
          <ColumnInternal columnId={ColumnId.LEFT} />
        </div>
        <div
          className={css`
            flex: 1 1 auto;
            background: #555;
          `}
          style={{ flex: "1 1 auto" }}
        >
          Main
        </div>
        <div
          className={cx(
            css`
              width: 280px;
            `,
            css`
              background: #444;
            `,
          )}
        >
          <ColumnInternal columnId={ColumnId.RIGHT} />
        </div>
      </div>
      <PanelMounts />
    </Fragment>
  );
}

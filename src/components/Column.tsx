import { css, cx } from "@emotion/css";
import React from "react";
import { BORDER_COLOR, PANEL_COLOR } from "../styles";
import { useMainSelector } from "../utils/useSelector";
import { PanelInternal } from "./PanelInternal";
import { PanelTitle } from "./PanelTitle";

export function Column({ columnId, className }: { columnId: string; className: string }) {
  const column = useMainSelector((state) =>
    state.columnStates.find((c) => c.columnId === columnId),
  );

  return (
    <div
      className={cx(
        css`
          width: 280px;
          display: flex;
          flex-direction: column;
        `,
        className,
      )}
    >
      {column?.panelIds.map((panelId) => (
        <div
          key={panelId}
          className={css`
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            border: 1px solid ${BORDER_COLOR};
            &:not(:first-child) {
              margin-top: 1px;
            }
          `}
        >
          <div
            className={css`
              height: 21px;
              line-height: 21px;
              display: flex;
              flex: 0 0 auto;
            `}
          >
            <div
              className={css`
                margin-left: -1px;
                border-left: 1px solid ${BORDER_COLOR};
                border-right: 1px solid ${BORDER_COLOR};
                z-index: 1;
                background: ${PANEL_COLOR};
                padding: 0 10px;
                color: #ccc;
                font-size: 13px;
                font-weight: 500;
                user-select: none;
              `}
              draggable
              onDragStart={(evt) => {
                evt.dataTransfer.setData("application/x-panel-runtime.panelId", panelId);
              }}
            >
              <PanelTitle panelId={panelId} />
            </div>
          </div>
          <div
            className={css`
              z-index: 0;
              border-top: 1px solid ${BORDER_COLOR};
              margin-top: -1px;
              padding-top: 4px;
              background: ${PANEL_COLOR};
              flex: 1 1 0;
            `}
          >
            <PanelInternal key={panelId} panelId={panelId} />
          </div>
        </div>
      ))}
    </div>
  );
}

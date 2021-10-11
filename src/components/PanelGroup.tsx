import { css } from "@emotion/css";
import React from "react";
import { BORDER_COLOR, PANEL_COLOR } from "../styles";
import { useActions } from "../useActions";
import { useMainSelector } from "../useSelector";
import { PanelInternal } from "./PanelInternal";

export function PanelGroup({ panelGroupId }: { panelGroupId: string }) {
  const panelGroup = useMainSelector((state) => {
    for (const column of state.columns) {
      for (const group of column.panelGroups) {
        if (group.panelGroupId === panelGroupId) {
          return group;
        }
      }
    }

    return null;
  });

  const actions = useActions();

  if (panelGroup == null) {
    return null;
  }

  return (
    <div
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
            if (evt.dataTransfer == null) {
              return;
            }

            actions.startDrag(evt.dataTransfer);
          }}
        >
          {panelGroup.panels?.[0]?.title}
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
        <PanelInternal panelId={panelGroup.panels[0]?.panelId} />
      </div>
    </div>
  );
}

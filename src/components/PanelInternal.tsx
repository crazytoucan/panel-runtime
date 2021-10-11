import React, { useLayoutEffect, useRef } from "react";
import { useMainSelector } from "../useSelector";

export function PanelInternal({ panelId }: { panelId: string }) {
  const panelState = useMainSelector((state) => {
    for (const column of state.columns) {
      for (const group of column.panelGroups) {
        for (const panel of group.panels) {
          if (panel.panelId === panelId) {
            return panel;
          }
        }
      }
    }
    return null;
  });

  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const panelEl = panelState?.htmlElement;
    const refEl = ref.current;
    if (panelEl == null || refEl == null) {
      return;
    }

    refEl.appendChild(panelEl);
    return () => {
      refEl.removeChild(panelEl);
    };
  }, [ref, panelState?.htmlElement]);

  return <div ref={ref} />;
}

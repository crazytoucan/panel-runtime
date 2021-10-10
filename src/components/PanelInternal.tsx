import React, { useLayoutEffect, useRef } from "react";
import { useSelector } from "../utils/useSelector";

export function PanelInternal({ panelId }: { panelId: string }) {
  const panelState = useSelector((state) => state.panelStates.find((p) => p.panelId === panelId));
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

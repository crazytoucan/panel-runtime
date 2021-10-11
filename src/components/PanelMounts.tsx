import React, { Fragment, memo, ReactChild } from "react";
import ReactDOM from "react-dom";
import { useMainSelector } from "../useSelector";

function PanelMount({
  htmlElement,
  reactChild,
}: {
  htmlElement: HTMLElement;
  reactChild: ReactChild | null;
}) {
  return ReactDOM.createPortal(reactChild, htmlElement);
}

const PanelMountMemo = memo(PanelMount);

export function PanelMounts({}: {}) {
  const panels = useMainSelector((state) =>
    state.columns.flatMap((c) => c.panelGroups.flatMap((g) => g.panels)),
  );

  return (
    <Fragment>
      {panels.map((panel) => (
        <PanelMountMemo
          key={panel.panelId}
          htmlElement={panel.htmlElement}
          reactChild={panel.reactChild}
        />
      ))}
    </Fragment>
  );
}

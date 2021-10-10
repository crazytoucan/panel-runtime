import React, { Fragment, memo, ReactChild } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "../utils/useSelector";

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
  const panels = useSelector((state) => state.panelStates);

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

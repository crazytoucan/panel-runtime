import React from "react";
import { PanelRuntime } from "../PanelRuntime";
import { assertNotNull } from "../utils/assertUtils";

const containerEl = document.getElementById("container");
assertNotNull(containerEl);

const runtime = new PanelRuntime();
runtime.openPanel({
  title: "Elements",
  element: <div>Hello Left 0</div>,
  preferredSide: "left",
});
runtime.openPanel({
  title: "Elements",
  element: <div>Hello Left 1</div>,
  preferredSide: "left",
});

runtime.openPanel({
  title: "Elements",
  element: <div>Hello Right</div>,
  preferredSide: "right",
});

runtime.mount(containerEl);

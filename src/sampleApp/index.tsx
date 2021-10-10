import React from "react";
import { PanelRuntime } from "../PanelRuntime";
import { assertNotNull } from "../utils/assertUtils";

const containerEl = document.getElementById("container");
assertNotNull(containerEl);

const runtime = new PanelRuntime();
runtime.openPanel({
  name: "Elements",
  element: <div>Hello Panels</div>,
  preferredSide: "left",
});

runtime.mount(containerEl);

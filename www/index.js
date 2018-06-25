import React from "react";
import { render } from "react-dom";

import Root from "./react/Root.jsx";
import "./sass/global.scss";

console.log("[webpack is setup!]");

const node = document.getElementById("react");
render(<Root />, node);

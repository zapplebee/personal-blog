import React from "react";
import { render } from "react-dom";
import { DynamicHeader } from "../lib/motifs";

const headerContainer = document.querySelector("#header-container");
headerContainer.innerHTML = "";

render(<DynamicHeader />, headerContainer);

console.log(
  "%c         ",
  'font-size: 100px;letter-spacing:-1em;background-size:contain;background-repeat: no-repeat;background-image: url("https://www.windowscentral.com/sites/wpcentral.com/files/styles/larger/public/field/image/2020/03/clippy-png.png")'
);

console.log(
  "%cLooks like you're trying to see how this webpage works. Why not have a look at the repository?",
  "font-size: 24px;letter-spacing:-1em; font-family: serif;"
);

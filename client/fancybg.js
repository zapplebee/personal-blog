import React from "react";
import { render } from "react-dom";

const headerContainer = document.querySelector("#bg-container");

const Svg = ({ offset }) => {
  const scale = 1;
  const o = offset * scale;
  return (
    <svg
      viewBox="0 0 100 100"
      style={{ height: "100vh", width: "100vw", top: 0, position: "fixed" }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect x={0} y={0} fill={`#b4bac3`} height={100} width={100} />
      <path
        d={`M -30,0 L 130,0, L 130,50 C 50,${o} 50,${
          -1 * o + 100 * scale
        } -30,50 Z`}
        stroke={`#d7d8db`}
        strokeWidth={10}
        fill={`#d7d8db`}
      ></path>
    </svg>
  );
};

export const DynamicHeader = () => {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    function doIt() {
      setOffset((o) => {
        const newOffset = o + 0.000125;
        if (newOffset >= 1) {
          return 0;
        }
        return newOffset;
      });
      requestAnimationFrame(doIt);
    }
    doIt();
  }, [setOffset]);

  const mathOffset = Math.sin(Math.PI * offset);
  return <Svg offset={mathOffset * 100} />;
};

render(<DynamicHeader />, headerContainer);

console.log(
  "%c         ",
  'font-size: 100px;letter-spacing:-1em;background-size:contain;background-repeat: no-repeat;background-image: url("https://zapplebee.github.io/public/clippy.png")'
);

console.log(
  "%cLooks like you're trying to see how this webpage works. Why not have a look at the repository?",
  "font-size: 24px;letter-spacing:-1em; font-family: serif;"
);

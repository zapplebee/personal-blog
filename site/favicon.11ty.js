import React from "react";
import { theme } from "twin.macro";

class Index {
  data() {
    return {
      sizes: [180, 32, 16, 96, 57, 114, 72, 144, 60, 120, 76, 152],
      pagination: {
        data: "sizes",
        size: 1,
        alias: "size",
      },
      eleventyExcludeFromCollections: true,
      tag: [],
      layout: "svgAsPng",
      width: (data) => data.size,
      permalink: (data) => {
        return `icons/favicon-${data.size}.png`;
      },
    };
  }

  async render() {
    return (
      <svg
        version="1.1"
        viewBox="0 0 630 630"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient
            id="linearGradient904"
            x1="24"
            x2="488"
            y1="256"
            y2="256"
            gradientUnits="userSpaceOnUse"
          >
            <stop style={{ stopColor: "#d7d8db" }} offset="0" />
            <stop style={{ stopColor: "#b4bac3" }} offset="1" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          fill={theme`colors.brown`}
          height={630}
          width={1200}
        />
        <path
          transform="translate(0,120)"
          d="M 0,0 L 1200,100 L1200,630 L 0,630 Z"
          style={{ fill: "url(#linearGradient904)" }}
        />

        <text
          x="8"
          y="550"
          fill={theme`colors.brown`}
          fontSize={"480"}
          fontFamily="Helvetica Neue"
          fontWeight={"bold"}
          fontStyle={"uppercase"}
        >
          ZS
        </text>
      </svg>
    );
  }
}

module.exports = Index;

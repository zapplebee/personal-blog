import React from "react";
import { theme } from "twin.macro";

class Index {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      pagination: {
        data: "collections.all",
        size: 1,
        alias: "post",
      },
      tag: [],
      title: "aaa",
      layout: "svgAsPng",
      permalink: ({ post }) => {
        return `${post.url}/og.png`;
      },
      width: 1200,
    };
  }

  async render(data) {
    function* getLines() {
      const words = data.post.data.summary.split(" ");
      let line = "";
      for (let i = 0; i < words.length; i++) {
        const possibleLine = line + " " + words[i];
        if (possibleLine.length > 30) {
          yield line;
          line = words[i];
        } else {
          line = possibleLine;
        }
      }
      yield line;
    }

    const x = [...getLines()];

    return (
      <svg
        version="1.1"
        viewBox="0 0 1200 630"
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
          d="M 0,0 L 1200,100 L1200,630 L 0,630 Z"
          style={{ fill: "url(#linearGradient904)" }}
        />

        {x.map((line, index) => {
          return (
            <text
              x="50"
              y={164 + index * 64}
              fill={theme`colors.brown`}
              fontSize={"64"}
              fontFamily="Helvetica Neue"
              fontStyle={"uppercase"}
              fontWeight={"700"}
            >
              {line}
            </text>
          );
        })}

        <text
          x="420"
          y="550"
          fill={theme`colors.brown`}
          fontSize={"96"}
          fontFamily="Helvetica Neue"
          fontWeight={"bold"}
          fontStyle={"uppercase"}
        >
          zachary skalko
        </text>
      </svg>
    );
  }
}

module.exports = Index;

import React from "react";
import tw, { GlobalStyles } from "twin.macro";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";
import { minify } from "html-minifier-terser";
import PurgeCSS from "@fullhuman/postcss-purgecss";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import cssnano from "cssnano";
import classNameShortener from "postcss-class-name-shortener";

import { renderToStaticNodeStream } from "react-dom/server";

const GStyle = createGlobalStyle`
details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}

details {
  ${tw`select-none`}
}

details > summary, details[open] > summary {
  height: 4rem;
  width: 4rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  margin-left: auto; 
  background: url('/img/icon-menu.svg');
  background-size: cover;
  background-position: center;
}

details[open] > summary {
  background: url('/img/icon-x.svg');
  background-size: cover;
  background-position: center;
}

body {
  background-color: #d7d8db !important;
}

#bg-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
}

#content {
  z-index: 1;
}

`;

export async function render(data, children) {
  const sheet = new ServerStyleSheet();
  let collectedStyles = "";
  let body = "";

  try {
    const reactStream = renderToStaticNodeStream(
      sheet.collectStyles(
        <>
          <GStyle />
          <GlobalStyles />
          <nav tw="bg-brown text-gray text-3xl md:text-6xl p-6 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <a href="/" tw="hocus:text-gold">
                {data.metadata.FQDN}
              </a>
            </div>
            <div tw="text-lg md:text-3xl self-center text-left md:text-right">
              <a
                href="https://twitter.com/zapplebee"
                tw="hocus:text-gold"
                target={"_blank"}
              >
                twitter
              </a>
              &nbsp;|&nbsp;
              <a
                href="https://github.com/zapplebee"
                tw="hocus:text-gold"
                target={"_blank"}
              >
                github
              </a>
              &nbsp;|&nbsp;
              <a
                href="https://www.linkedin.com/in/zachary-skalko-b33b3536/"
                tw="hocus:text-gold"
                target={"_blank"}
              >
                linkedin
              </a>
            </div>
          </nav>
          <div>{children}</div>
        </>
      )
    );

    function end() {
      return new Promise((resolve, err) => {
        reactStream.on("end", resolve);
      });
    }

    const parts = [];
    reactStream.on("data", (d) => {
      parts.push(d);
    });
    await end();

    body =
      `<body><div id="content">` +
      Buffer.concat(parts).toString("utf-8") +
      `</div><div id="bg-container"></div></body>`;

    collectedStyles = sheet.getStyleTags();
  } catch (err) {
    console.log(err);
  } finally {
    sheet.seal();

    let classNameMap = {};

    const prefixed = await postcss([
      autoprefixer({
        overrideBrowserslist: ["last 1 version", "> 1%", "IE 10"],
      }),
      cssnano({
        preset: ["default", { discardComments: { removeAll: true } }],
      }),
      PurgeCSS({
        safelist: [":target", "body", "#bg-container", "#content"],
        keyframes: true,
        content: [
          {
            raw: `<!doctype html><html><head></head>${body}</html>`,
            extension: "html",
          },
        ],
      }),

      classNameShortener({
        callback: (map) => {
          classNameMap = map;
        },
      }),
    ]).process(collectedStyles.replace(/<[^/]+>/, "").replace("</style>", ""), {
      from: undefined,
    });

    const { FQDN, protocol } = data.metadata;

    const base = protocol + FQDN;

    const Head = `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <base href="${base}">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="twitter:site" content="@zapplebee"/>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:description" content="${data.summary}" />
          <meta name="twitter:image" content="${base}${
      data.page.url
    }twitter.png">
    <meta name="twitter:image:alt" content="Image of text: ${data.summary}"/>
          <meta property="og:locale" content="en_US" />
          <meta property="og:image" content="${base}${data.page.url}og.png" />
          <link rel="canonical" href="${base}${data.page.url}" />
          <meta property="og:url" content="${base}${data.page.url}" />
          <meta property="og:description" content="${data.summary}" />
          <meta property="og:type" content="${
            data.layout === "post" ? "article" : "website"
          }" />
          <meta property="og:title" content="${data.title}" />
          <title>Zachary Skalko Blog | ${data?.title}</title>
          <style>${prefixed}</style>
          <script defer src="/clientScripts.js"></script>
        </head>`;

    let minifiedClassBody = body;

    for (const [original, newName] of Object.entries(classNameMap)) {
      minifiedClassBody = minifiedClassBody.replaceAll(original, newName);
    }

    return minify(Head + minifiedClassBody + `</html>`, {
      caseSensitive: true,
      collapseInlineTagWhitespace: false,
      collapseWhitespace: true,
      keepClosingSlash: true,
      minifyCSS: true,
      minifyJS: true,
      quoteCharacter: '"',
      removeComments: true,
      removeEmptyAttributes: true,
    });
  }
}

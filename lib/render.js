import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import MDX from "@mdx-js/runtime";
import tw, { GlobalStyles } from "twin.macro";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";
import { minify } from "html-minifier-terser";
import PurgeCSS from "@fullhuman/postcss-purgecss";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import cssnano from "cssnano";
import { Motifs, Header, ArticleHeader, Container } from "./motifs";
import classNameShortener from "postcss-class-name-shortener";

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

`;

export async function renderMd(md, data) {
  const components = (() => {
    if (Motifs.hasOwnProperty(data.motif)) {
      return Motifs[data.motif];
    }
    if (data.motif === undefined) {
      return Motifs.DEFAULT;
    }
    throw new Error(`motif ${data.motif} does not exist`);
  })();

  const content = (
    <>
      <ArticleHeader pubDate={data.pubDate} />
      <Container>
        <MDX components={components}>{md}</MDX>
      </Container>
    </>
  );

  return render(content, data);
}

export async function render(content, data) {
  const components = (() => {
    if (Motifs.hasOwnProperty(data.motif)) {
      return Motifs[data.motif];
    }
    if (data.motif === undefined) {
      return Motifs.DEFAULT;
    }
    throw new Error(`motif ${data.motif} does not exist`);
  })();

  const sheet = new ServerStyleSheet();
  let collectedStyles = "";
  let body = "";

  console.log(data.keywords);

  const clientScripts = data.clientScripts ?? [];

  console.log(clientScripts);

  try {
    body = renderToStaticMarkup(
      sheet.collectStyles(
        <>
          <GlobalStyles />
          <GStyle />
          <body>
            <Header />
            {content}
            {clientScripts.map((s) => {
              return <script key={s} src={`client/${s}.js`} defer={true} />;
            })}
          </body>
        </>
      )
    );
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
        safelist: [":target"],
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

    const Head = `<!doctype html>
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@100;400;700&display=swap" rel="stylesheet">
        <meta charset="utf-8">
        <base href="http://localhost:8080">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${data?.title}</title>
        <style>${prefixed}</style>
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

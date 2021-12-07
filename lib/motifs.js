import React from "react";
import tw, { theme } from "twin.macro";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import nord from "react-syntax-highlighter/dist/cjs/styles/hljs/nord";

function Code({ className, ...props }) {
  const match = /language-([a-z]+)/.exec(className || "");
  const lineNumbers = className.endsWith("-lines");
  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      showLineNumbers={lineNumbers}
      PreTag="div"
      {...props}
      style={nord}
    />
  ) : (
    <code className={className} {...props} />
  );
}

const CS = styled.iframe`
  width: 90vw;
  height: 80vh;
  position: absolute;
  left: -45vw;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
`;

const CSSpacer = styled.div`
  height: 80vh;
  width: 0;
  margin: auto;
  position: relative;
`;

function CodeSandbox({ src, title }) {
  return (
    <CSSpacer>
      <CS
        src={src}
        title={title}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></CS>
    </CSSpacer>
  );
}

function Table({ children }) {
  const contents = React.Children.toArray(children);

  let thead = null;
  let tbody = null;

  if (contents.length === 2) {
    [thead, tbody] = contents;
  } else {
    thead = null;
    tbody = contents[0];
  }

  const headers = thead
    ? React.Children.toArray(
        React.Children.toArray(thead.props.children)[0].props.children.map(
          (c) => c.props.children
        )
      )
    : null;

  const rows = React.Children.toArray(tbody.props.children).map((row) =>
    React.Children.toArray(row.props.children).map((td) => td.props.children)
  );

  return (
    <>
      <div
        tw="hidden sm:grid"
        style={{
          gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
        }}
      >
        {headers &&
          headers.map((h) => (
            <div tw="font-semibold text-lg border-b border-purple p-2">{h}</div>
          ))}
        {rows.map((r, i) => {
          return r.map((e, j) => (
            <div key={[i, j]} tw="p-2">
              {e}
            </div>
          ));
        })}
      </div>
      <div tw="grid grid-cols-1 gap-4 sm:hidden">
        {rows.map((r, i) => {
          return (
            <div
              key={i}
              tw="grid grid-cols-1 bg-white p-2 border border-purple"
            >
              {r.map((e, j) => (
                <div key={[i, j]}>
                  {headers && (
                    <div tw="font-light text-sm p-2 pb-0 border-b border-gray text-gray text-right">
                      {headers[j]}
                    </div>
                  )}
                  <div tw="p-2">{e}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

export const defaultMotif = {
  h1: tw.h1`text-purple font-medium text-5xl`,
  h2: tw.h2`text-brown font-medium text-3xl`,
  h3: tw.h3`font-semibold`,
  p: tw.p`text-black font-medium`,
  b: tw.b`font-bold`,
  ul: tw.ul`font-medium grid grid-cols-1 gap-2 list-disc max-w-prose md:max-width[120ch] m-0 ml-8`,
  li: tw.li`font-medium`,
  a: tw.a`text-blue visited:text-purple hocus:text-brown`,
  code: Code,
  CodeSandbox,
  table: Table,
};

export const Motifs = {
  cool: {
    ...defaultMotif,
    h1: tw(defaultMotif.h1)`bg-aqua text-black`,
    h2: tw(defaultMotif.h2)`bg-blue text-black`,
  },
  warm: defaultMotif,
  DEFAULT: defaultMotif,
};

const Svg = ({ offset }) => {
  const scale = 1;
  const o = offset * scale;
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <rect
        width="100"
        height="100"
        x={0}
        y="0"
        fill={theme`colors.aqua`}
      ></rect>
      <path
        d={`M -30,0 L 130,0, L 130,50 C 50,${o} 50,${
          -1 * o + 100 * scale
        } -30,50 Z`}
        stroke={`white`}
        strokeWidth={10}
        fill={"transparent"}
      ></path>
    </svg>
  );
};

const SiteHeader = tw.h1`p-6 text-center font-bold text-6xl uppercase tracking-widest color[transparent] bg-clip-text inline-block m-auto`;

const ArticleHeaderContainer = tw.div`flex justify-between bg-black text-white p-4 font-light pt-1 pb-1`;

export function ArticleLink(p) {
  return (
    <a
      href={p.url}
      tw="border-l border-b border-aqua text-black visited:border-aqua p-4 grid gap-4"
    >
      <h1 tw="text-2xl font-bold uppercase">{p.title}</h1>
      <p tw="text-xl font-light">{p.description}</p>
      <ul tw="grid grid-cols-4 font-light border-gray border-t pt-2 gap-2 text-sm">
        {p.keywords.map((e) => (
          <li tw="text-center" key={e}>
            {e}
          </li>
        ))}
      </ul>
    </a>
  );
}

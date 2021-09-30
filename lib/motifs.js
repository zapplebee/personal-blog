import React, { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import tw, { theme } from "twin.macro";
import styled from "styled-components";
import mini from "mini-svg-data-uri";

const defaultMotif = {
  h1: tw.h1`text-purple font-medium text-5xl`,
  h2: tw.h2`text-orange font-medium text-3xl`,
  h3: tw.h3`font-medium`,
  p: tw.p`text-black font-medium`,
  b: tw.b`font-bold`,
  ul: tw.ul`font-medium grid grid-cols-1 gap-2 list-disc`,
  li: tw.li`font-medium`,
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

export const DynamicHeader = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function doIt() {
      setOffset((o) => {
        const newOffset = o + 0.0005;
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
  const svg = <Svg offset={mathOffset * 100} />;
  return (
    <SiteHeader
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundImage: `url("${mini(renderToStaticMarkup(svg))}")`,
      }}
    >
      chill conservatory
    </SiteHeader>
  );
};

export const Header = () => (
  <div tw="bg-purple flex" id="header-container">
    <DynamicHeader />
  </div>
);

export const Container = styled.article`
  ${tw`max-w-prose m-auto grid grid-cols-1 gap-6 p-8`}
`;

export function ArticleHeader({ pubDate }) {
  return (
    <ArticleHeaderContainer>
      <span></span>
      <span>{pubDate}</span>
    </ArticleHeaderContainer>
  );
}

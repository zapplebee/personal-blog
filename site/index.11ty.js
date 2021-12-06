import React from "react";
import "twin.macro";
import { defaultMotif } from "./../lib/motifs";

const H1 = defaultMotif.h1;
const H2 = defaultMotif.h2;
const H3 = defaultMotif.h3;
const P = defaultMotif.p;
class Index {
  data() {
    return {
      tags: [],
      title: "aaa",
      layout: "full",
      summary: "The technology and personal blog of Zachary Skalko.",
    };
  }

  async render(data) {
    const { all, post, ...restCollections } = data.collections;
    return (
      <div tw="p-16 m-auto">
        <P>
          hi. im zac skalko. im an engineer, specifically focused on the web.
        </P>

        {Object.entries(restCollections).map(([key, entries]) => {
          return (
            <div key={key} tw="p-4">
              <H2 tw="border-b border-purple">{key.toLowerCase()}</H2>
              <div tw="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-0 pt-4 pb-4 md:p-10">
                {entries.map((p) => {
                  return (
                    <a
                      href={p.url}
                      key={p.url}
                      tw="grid grid-cols-1 gap-2 text-gray visited:text-purple hocus:text-gold bg-brown p-4"
                    >
                      <H2 tw="color[inherit]!">{p.data.title}</H2>
                      <P tw="color[inherit]!">{p.data.summary}</P>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

module.exports = Index;

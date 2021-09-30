import React from "react";
import { render } from "./../lib/render";
import { ArticleLink } from "../lib/motifs";
import tw from "twin.macro";

const METADATA = {
  permalink: "/",
  ogImage: true,
};

class Index {
  data() {
    return {
      title: "Initial Page",
      clientScripts: ["search", "articles"],
    };
  }

  async render(data) {
    const otherPages = data.collections.all.filter((item) => {
      return item.data.page !== data.page;
    });
    const linkableOtherPages = otherPages.map((op) => {
      return {
        url: op.url,
        description: op.data.description,
        pubDate: op.data.pubDate,
        keywords: op.data.keywords,
        title: op.data.title,
      };
    });

    return await render(
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ${JSON.stringify(
              linkableOtherPages
            )}`,
          }}
        />
        <div id="search-container"></div>
        <nav
          tw="max-w-prose m-auto grid grid-cols-1 p-4 gap-4"
          id="article-link-container"
        >
          {linkableOtherPages.map((p) => {
            return <ArticleLink {...p} key={p.url} />;
          })}
        </nav>
      </>,
      data
    );
  }
}

module.exports = Index;

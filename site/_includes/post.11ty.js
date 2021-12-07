import React from "react";
import MDX from "@mdx-js/runtime";
import { defaultMotif } from "../../lib/motifs";
import tw from "twin.macro";

import { render } from "../../lib/page";
import { getPubDates } from "../../lib/pubDate";
import { DateTime } from "luxon";

const Article = tw.article`pl-4 pr-4 max-w-prose md:max-width[120ch] m-auto pt-4 pb-4 grid grid-cols-1 gap-6 mb-32`;

class Post {
  async render(data) {
    const Container = Article;

    const pubDates = getPubDates(data.page.inputPath);

    const publishLabel =
      pubDates.length === 1 ? "Published:" : "Initially published:";

    const pubDate = getPubDates(data.page.inputPath).at(-1);

    const children = (
      <>
        <div tw="bg-gray text-brown flex gap-2 p-2 justify-end text-sm">
          <div>
            {publishLabel}{" "}
            <time dateTime={pubDate.toISO()}>
              {pubDate.toLocaleString(DateTime.DATE_FULL)}
            </time>
          </div>

          {pubDates.length === 1 ? (
            ""
          ) : (
            <div>
              Updated:{" "}
              <time dateTime={pubDates[0].toISO()}>
                {pubDates[0].toLocaleString(DateTime.DATE_FULL)}
              </time>
            </div>
          )}
        </div>
        <Container>
          {typeof data.content === "string" ? (
            <MDX components={defaultMotif}>{data.content}</MDX>
          ) : (
            data.content
          )}
        </Container>
      </>
    );
    const page = await render(data, children);

    return page;
  }
}
module.exports = Post;

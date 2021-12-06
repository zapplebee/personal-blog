import React from "react";
import MDX from "@mdx-js/runtime";
import { defaultMotif } from "../../lib/motifs";
import tw from "twin.macro";

import { render } from "../../lib/page";

const Article = tw.article`pl-4 pr-4 max-w-prose md:max-width[120ch] m-auto pt-4 pb-4 grid grid-cols-1 gap-6`;

class Post {
  async render(data) {
    const Container = Article;

    const children = (
      <Container>
        {typeof data.content === "string" ? (
          <MDX components={defaultMotif}>{data.content}</MDX>
        ) : (
          data.content
        )}
      </Container>
    );
    const page = await render(data, children);

    return page;
  }
}
module.exports = Post;

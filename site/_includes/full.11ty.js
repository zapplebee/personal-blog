import React from "react";
import MDX from "@mdx-js/runtime";
import { defaultMotif } from "../../lib/motifs";

import { render } from "../../lib/page";

class Full {
  async render(data) {
    const Container = React.Fragment;

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
module.exports = Full;

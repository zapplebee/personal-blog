import React from "react";
import { render, createPortal } from "react-dom";
import tw from "twin.macro";

import { ArticleLink } from "../lib/motifs";

const articleLinkContainer = document.querySelector("#article-link-container");

function Search({ children }) {
  const searchContainer = document.querySelector("#search-container");
  return createPortal(children, searchContainer);
}

const SearchContainer = tw.div`max-w-prose m-auto p-4`;
const Input = tw.input``;

function ControllerInput() {
  const [search, setSearch] = React.useState("");
  return (
    <SearchContainer>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="filter..."
        type="text"
        tw="block w-full m-auto border border-aqua mt-2 text-2xl outline-none p-2"
      />
    </SearchContainer>
  );
}

articleLinkContainer.innerHTML = "";
render(
  <>
    <Search>
      <ControllerInput />
    </Search>
    {window.DO_NOT_USE_OR_YOU_WILL_BE_FIRED.map((p) => (
      <ArticleLink key={p.url} {...p} />
    ))}
  </>,
  articleLinkContainer
);

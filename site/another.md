---
title: Building an Eleventy Site With React, MDX, and Tailwind
description: I know that sounds like a lof of keywords, but it's going to be a lot less than that sounds like. You're going to make something cool.
motif: warm
keywords:
  - eleventy
  - 11ty
  - react
  - mdx
  - tailwind
pubDate: 09-14-2021
clientScripts:
  - search
---

# Building an Eleventy Site With React, MDX, and Tailwind

## I know that sounds like a lof of keywords, but it's going to be a lot less than that sounds like

### Let's start with a glossary.

- **Eleventy:** It's a very nice, unopinionated, static site generator.
- **React:** A really advanced templating language (so many people are going to be mad about this, but frankly that's how we're going to use it in this application).
- **MDX:** Mix React with Markdown, nicely
- **Tailwind:** A CSS utility library

### Now, why

- React has a huge ecosystem of resources to help you get started.
- Eleventy let's you plug whatever you want into its markdown renderer
- MDX lets us declare React components to render from markdown
- Tailwind lets us control styles in one place.

There's a lot to like about the way that React lets you handle props getting passed around, its ability to compose components, the interop with a ton of things in its ecosystem. But let's be honest. It's bulky AND you don't need it for every use case. In fact, there are a of scenarios where it can be detremental to use it. If you're building something to want to get right for SEO, for instance, a Single Page Application just won't get you what you want in terms of search rank.

Additionally, loading client JS simply extends the time to interact.

Think about what you are trying to build before you build it.

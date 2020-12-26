# 🎓 remark-parse-frontmatter

![npm version](https://img.shields.io/npm/v/remark-parse-frontmatter)
![GitHub license](https://img.shields.io/github/license/phuctm97/remark-parse-frontmatter)

Parses and validates Markdown frontmatter (YAML) to `file.data.frontmatter`.

Validation is done by [revalidator].

Built for Remark 12, won't work with Remark 13. Requires [remark-frontmatter].

## Example

`example.js`:

```js
const processor = remark()
  .use(require("remark-frontmatter"))
  .use(require("remark-parse-frontmatter"))
  .freeze();

const file = processor.processSync(`
---
title: Hello, World!
---
`);

console.log(file.data.frontmatter);
```

Output:

```
{
  title: "Hello, World!"
}
```

## Usage

### Install

```bash
yarn add remark-parse-frontmatter
```

### Configure

Unified / Remark:

```js
// Without validation
unified()
  .use(require("remark-parse"))
  .use(require("remark-frontmatter"))
  .use(require("remark-parse-frontmatter"))
  .use(require("remark-stringify"));

// With validation
unified()
  .use(require("remark-parse"))
  .use(require("remark-frontmatter"))
  .use(require("remark-parse-frontmatter"), {
    properties: {
      title: { type: "string", required: true },
      tags: { type: "array", maxItems: 4 },
    },
  })
  .use(require("remark-stringify"));
```

```js
// Without validation.
remark()
  .use(require("remark-frontmatter"))
  .use(require("remark-parse-frontmatter"));

// With validation.
remark()
  .use(require("remark-frontmatter"))
  .use(require("remark-parse-frontmatter"), {
    properties: {
      title: { type: "string", required: true },
      tags: { type: "array", maxItems: 4 },
    },
  });
```

MDX:

```js
// Without validation.
mdx(mdxText, {
  remarkPlugins: [
    require("remark-unwrap-texts"),
    require("remark-parse-frontmatter"),
  ],
});

// With validation.
mdx(mdxText, {
  remarkPlugins: [
    require("remark-unwrap-texts"),
    [
      require("remark-parse-frontmatter"),
      {
        properties: {
          title: { type: "string", required: true },
          tags: { type: "array", maxItems: 4 },
        },
      },
    ],
  ],
});
```

---

Made by [@phuctm97].

<!-- Links -->

[@phuctm97]: https://twitter.com/phuctm97
[remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter
[revalidator]: https://github.com/flatiron/revalidator

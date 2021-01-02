# 🎓 remark-parse-frontmatter

[![Github checks][checks badge]][checks url]
[![npm version][npm badge]][npm url]
[![Code style][code style badge]][code style url]
[![GitHub license][license badge]][license url]

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

<!-- Badges -->

[checks badge]:
  https://img.shields.io/github/checks-status/phuctm97/remark-parse-frontmatter/master?logo=Github
[npm badge]: https://img.shields.io/npm/v/remark-parse-frontmatter?logo=npm
[code style badge]:
  https://img.shields.io/badge/code%20style-prettier-F7B93E?logo=Prettier
[license badge]:
  https://img.shields.io/github/license/phuctm97/remark-parse-frontmatter
[checks url]:
  https://github.com/phuctm97/remark-parse-frontmatter/actions?query=workflow%3APR+branch%3Amaster
[npm url]: https://www.npmjs.com/package/remark-parse-frontmatter
[code style url]: /.prettierrc.json
[license url]: /LICENSE

<!-- Links -->

[@phuctm97]: https://twitter.com/phuctm97
[remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter
[revalidator]: https://github.com/flatiron/revalidator

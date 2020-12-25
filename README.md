# 🎓 remark-parse-frontmatter

![npm version](https://img.shields.io/npm/v/remark-parse-frontmatter)
![GitHub license](https://img.shields.io/github/license/phuctm97/remark-parse-frontmatter)

Parses and validates Markdown frontmatter (YAML) to `file.data.frontmatter`.

Built for Remark 12, won't work with Remark 13. Requires `remark-frontmatter`.

## Usage

### Install

```bash
yarn add remark-parse-frontmatter
```

### Configure

Unified / Remark:

```js
unified()
  .use(require("remark-parse"))
  .use(require("remark-frontmatter"))
  .use(require("remark-parse-frontmatter"))
  .use(require("remark-stringify"));
```

```js
remark()
  .use(require("remark-frontmatter"))
  .use(require("remark-parse-frontmatter"));
```

MDX:

```js
mdx(mdxText, {
  remarkPlugins: [
    require("remark-unwrap-texts"),
    require("remark-parse-frontmatter"),
  ],
});
```

---

<sub>
Built with 💙 by <a href="https://twitter.com/phuctm97">@phuctm97</a>
</sub>

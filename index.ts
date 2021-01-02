import { Plugin } from "unified";
import find from "unist-util-find";
import { parse } from "yaml";
import revalidator from "revalidator";

/**
 * Parses and validates Markdown frontmatter (YAML) to `file.data.frontmatter`.
 *
 * Validation is done by `revalidator`. See https://github.com/flatiron/revalidator.
 *
 * Built for Remark 12, won't work with Remark 13. Requires `remark-frontmatter`.
 */
const plugin: Plugin<[Revalidator.JSONSchema<any>?]> = (schema) => (
  tree,
  file
) => {
  const node = find(tree, { type: "yaml" });
  if (!node) {
    file.message("No yaml node.");
    return;
  }
  if (typeof node.value !== "string") file.fail("Invalid yaml node.", node);

  let frontmatter;
  try {
    frontmatter = parse(node.value);
  } catch (err) {
    file.fail(err, node);
  }

  if (schema) {
    const result = revalidator.validate(frontmatter, schema);
    if (!result.valid) {
      const errs = JSON.stringify(result.errors, null, 2);
      file.fail(`Invalid frontmatter: ${errs}.`, node);
    }
  }

  const data: any = file.data;
  data.frontmatter = frontmatter;
};

export = plugin;

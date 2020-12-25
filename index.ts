import { Parent, Literal } from "unist";
import { VFile } from "vfile";
import { parse } from "yaml";
import find from "unist-util-find";
import revalidator from "revalidator";

/**
 * Parses and validates Markdown frontmatter (YAML) to `file.data.frontmatter`.
 *
 * Validation is done by `revalidator`. See https://github.com/flatiron/revalidator.
 *
 * Built for Remark 12, won't work with Remark 13. Requires `remark-frontmatter`.
 */
const plugin = <T>(schema?: Revalidator.JSONSchema<T>) => (
  tree: Parent,
  file: VFile
) => {
  const yamlNode: Literal = find(tree, { type: "yaml" });
  if (!yamlNode) file.fail("No yaml node.");
  if (typeof yamlNode.value !== "string")
    file.fail("Invalid yaml node.", yamlNode);

  let frontmatter;
  try {
    frontmatter = parse(yamlNode.value);
  } catch (err) {
    file.fail(err, yamlNode);
  }

  if (schema) {
    const result = revalidator.validate(frontmatter, schema);
    if (!result.valid) {
      const errs = JSON.stringify(result.errors, null, 2);
      file.fail(`Invalid frontmatter: ${errs}.`, yamlNode);
    }
  }

  const data: any = file.data;
  data.frontmatter = frontmatter;
};

export = plugin;

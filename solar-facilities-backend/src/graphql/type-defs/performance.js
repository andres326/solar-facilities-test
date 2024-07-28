import { readFileSync } from "node:fs";
import path from "node:path";
import { __dirname } from "../../utils/helpers.js";

const performanceTypes = readFileSync(
  path.join(__dirname(import.meta.url), "../schemas/performance.graphql"),
  {
    encoding: "utf-8",
  },
);

export default {
  types: `
    ${performanceTypes}
  `,
};

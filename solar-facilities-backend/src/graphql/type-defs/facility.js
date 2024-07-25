import { readFileSync } from "node:fs";
import path from "node:path";
import { __dirname } from "../../utils/helpers.js";

const facilityTypes = readFileSync(
  path.join(__dirname(import.meta.url), "../schemas/facility.graphql"),
  {
    encoding: "utf-8",
  },
);

export default {
  types: `
    ${facilityTypes}
  `,
};

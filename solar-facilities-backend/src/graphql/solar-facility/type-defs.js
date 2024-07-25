import { readFileSync } from "node:fs";
import path from "node:path";
import { __dirname } from "../../utils/index.js";

const solarFacilityTypes = readFileSync(
  path.join(__dirname(import.meta.url), "./solar-facility.graphql"),
  {
    encoding: "utf-8",
  },
);

export const typeDefs = `
  ${solarFacilityTypes}
`;

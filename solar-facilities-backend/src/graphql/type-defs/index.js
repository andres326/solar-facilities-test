import { default as Facility } from "./facility.js";
import { default as Performance } from "./performance.js";

const typeDefs = `
  ${Facility.types}
  ${Performance.types}
`;

export default typeDefs;

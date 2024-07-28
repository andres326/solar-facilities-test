import { default as Facility } from "./facility.js";
import { default as Performance } from "./performance.js";

const resolvers = {
  Query: {
    ...Facility.queries,
    ...Performance.queries,
  },
  Mutation: {
    ...Facility.mutations,
  },
};

export default resolvers;

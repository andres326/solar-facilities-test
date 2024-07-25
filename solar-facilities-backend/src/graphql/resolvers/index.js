import { default as Facility } from "./facility.js";

const resolvers = {
  Query: {
    ...Facility.queries,
  },
  Mutation: {
    ...Facility.mutations,
  },
};

export default resolvers;

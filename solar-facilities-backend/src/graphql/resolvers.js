import { SolarFacility } from "./solar-facility/index.js";

const resolvers = {
  Query: {
    ...SolarFacility.resolvers.queries,
  },
  Mutation: {
    ...SolarFacility.resolvers.mutations,
  },
};

export default resolvers;

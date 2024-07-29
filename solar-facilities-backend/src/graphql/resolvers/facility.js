import {
  createFacility,
  deleteFacility,
  getAllFacilities,
  getFacility,
  updateFacility,
} from "../../controllers/facility.js";
import { FACILITY_STATUS } from "../../utils/constants.js";

const queries = {
  facility: async (_, { id }) => {
    return getFacility(id);
  },
  facilities: async (_, { userId }) => {
    return getAllFacilities(userId);
  },
};

const mutations = {
  createFacility: async (_, { input }) => {
    const { name, power, userId } = input;

    return createFacility({
      name,
      power,
      status: FACILITY_STATUS.ENABLED,
      userId,
    });
  },
  updateFacility: async (_, { input }) => {
    const { id, name, power, userId } = input;
    return updateFacility(id, { name, power, userId });
  },
  deleteFacility: async (_, { id }) => {
    return deleteFacility(id);
  },
};

export default { queries, mutations };

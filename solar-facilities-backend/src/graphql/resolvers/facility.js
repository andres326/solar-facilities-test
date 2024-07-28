import {
  createFacility,
  deleteFacility,
  getAllFacilities,
  getFacility,
  updateFacility,
} from "../../controllers/facility.js";
import { FACILITY_STATUS } from "../../utils/constants.js";

const queries = {
  facility: async (root, { id }) => {
    return getFacility(id);
  },
  facilities: async (root, args) => {
    return getAllFacilities();
  },
};

const mutations = {
  createFacility: async (_, { input }) => {
    const { name, power } = input;

    return createFacility({ name, power, status: FACILITY_STATUS.ENABLED });
  },
  updateFacility: async (_, { input }) => {
    const { id, name, power } = input;
    return updateFacility(id, { name, power });
  },
  deleteFacility: async (_, { id }) => {
    return deleteFacility(id);
  },
};

export default { queries, mutations };

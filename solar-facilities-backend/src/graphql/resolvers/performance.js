import { getFacility } from "../../controllers/facility.js";
import { getPerformance } from "../../controllers/performance.js";

const queries = {
  performanceData: async (_, { facilityId }) => {
    return getPerformance({
      facilityId,
    });
  },
};

export default { queries };

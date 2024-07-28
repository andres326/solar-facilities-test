import { getFacility } from "../../controllers/facility.js";
import { getPerformance } from "../../controllers/performance.js";

const queries = {
  performanceData: async (_, { input }) => {
    const { facilityId, startDate, endDate } = input;
    return getPerformance({ facilityId, startDate, endDate });
  },
};

export default { queries };

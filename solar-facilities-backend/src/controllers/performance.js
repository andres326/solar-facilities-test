import { PerformanceModel } from "../model/performance.js";

export async function getPerformance({ facilityId, startDate, endDate }) {
  return PerformanceModel.find({
    facilityId,
    timestamp: { $gte: startDate, $lte: endDate },
  });
}

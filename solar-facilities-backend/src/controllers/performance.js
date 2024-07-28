import { PerformanceModel } from "../model/performance.js";

export async function getPerformance({ facilityId }) {
  return PerformanceModel.find({
    facilityId,
  });
}

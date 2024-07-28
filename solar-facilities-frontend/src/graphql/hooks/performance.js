import { useQuery } from "@apollo/client";
import { PERFORMANCE_DATA_QUERY } from "../queries/performance";

export const usePerformanceData = (id) => {
  const { data, loading, error } = useQuery(PERFORMANCE_DATA_QUERY, {
    fetchPolicy: "network-only",
    variables: { facilityId: id },
  });

  return {
    performanceData: data?.performanceData,
    loading,
    error: Boolean(error),
  };
};

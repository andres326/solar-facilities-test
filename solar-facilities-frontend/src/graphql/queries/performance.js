import { gql } from "@apollo/client";

const PERFORMANCE_FRAGMENT = gql`
  fragment PerformanceDetail on Performance {
    timestamp
    activePower
    energy
  }
`;

export const PERFORMANCE_DATA_QUERY = gql`
  query PerformanceData($facilityId: ID!) {
    performanceData(facilityId: $facilityId) {
      ...PerformanceDetail
    }
  }
  ${PERFORMANCE_FRAGMENT}
`;

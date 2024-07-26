import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URI;

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const FACILITY_DETAIL_FRAGMENT = gql`
  fragment FacilityDetail on Facility {
    id
    name
    power
  }
`;

export const FACILITIES_QUERY = gql`
  query Facilities {
    facilities {
      ...FacilityDetail
    }
  }
  ${FACILITY_DETAIL_FRAGMENT}
`;

export const FACILITY_QUERY = gql`
  query Facility($id: ID!) {
    facility(id: $id) {
      ...FacilityDetail
    }
  }
  ${FACILITY_DETAIL_FRAGMENT}
`;

export const CREATE_FACILITY_MUTATION = gql`
  mutation CreateFacilityMutation($input: CreateFacilityInput!) {
    facility: createFacility(input: $input) {
      ...FacilityDetail
    }
  }
  ${FACILITY_DETAIL_FRAGMENT}
`;

export const DELETE_FACILITY_MUTATION = gql`
  mutation DeleteFacilityMutation($id: ID!) {
    facility: deleteFacility(id: $id) {
      ...FacilityDetail
    }
  }
  ${FACILITY_DETAIL_FRAGMENT}
`;

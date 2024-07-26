import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_FACILITY_MUTATION,
  FACILITIES_QUERY,
  FACILITY_QUERY,
} from "./queries";

export const useFacilities = () => {
  const { data, loading, error } = useQuery(FACILITIES_QUERY, {
    fetchPolicy: "network-only",
  });

  return {
    facilities: data?.facilities,
    loading,
    error: Boolean(error),
  };
};

export const useCreateFacility = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_FACILITY_MUTATION);
  return {
    createFacility: async (input) => {
      const {
        data: { facility },
      } = await mutate({
        variables: { input },
        /*context: {
          headers : {
            'Authorization': `Bearer ${getAccessToken()}`
          }
        },*/
        update: (cache, { data: { facility } }) => {
          const data = cache.readQuery({
            query: FACILITIES_QUERY,
          });

          cache.writeQuery({
            query: FACILITIES_QUERY,
            data: { facilities: [...data.facilities, facility] },
          });
        },
      });
      return facility;
    },
    loading,
    error: Boolean(error),
  };
};

import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_FACILITY_MUTATION,
  DELETE_FACILITY_MUTATION,
  FACILITIES_QUERY,
  FACILITY_QUERY,
  UPDATE_FACILITY_MUTATION,
} from "../queries/facilities";

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

export const useFacility = (id) => {
  const { data, loading, error } = useQuery(FACILITY_QUERY, {
    fetchPolicy: "network-only",
    variables: { id },
  });

  return {
    facility: data?.facility,
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
          const { facilities } = cache.readQuery({
            query: FACILITIES_QUERY,
          });

          cache.writeQuery({
            query: FACILITIES_QUERY,
            data: { facilities: [...facilities, facility] },
          });
        },
      });
      return facility;
    },
    loading,
    error: Boolean(error),
  };
};

export const useUpdateFacility = () => {
  const [mutate, { loading, error }] = useMutation(UPDATE_FACILITY_MUTATION);
  return {
    updateFacility: async (input) => {
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
          const { facilities } = cache.readQuery({
            query: FACILITIES_QUERY,
          });

          const indexElement = facilities.findIndex(
            (el) => el.id === facility.id
          );
          const copyFacilities = [...facilities];
          if (indexElement !== -1) {
            copyFacilities.splice(indexElement, 1, facility);
          }
          cache.writeQuery({
            query: FACILITIES_QUERY,
            data: { facilities: [...copyFacilities] },
          });
        },
      });
      return facility;
    },
    loading,
    error: Boolean(error),
  };
};

export const useDeleteFacility = () => {
  const [mutate, { loading, error }] = useMutation(DELETE_FACILITY_MUTATION);
  return {
    deleteFacility: async (id) => {
      const {
        data: { facility },
      } = await mutate({
        variables: { id },
        /*context: {
          headers : {
            'Authorization': `Bearer ${getAccessToken()}`
          }
        },*/
        update: (cache, { data: { facility } }) => {
          const { facilities } = cache.readQuery({
            query: FACILITIES_QUERY,
          });

          cache.writeQuery({
            query: FACILITIES_QUERY,
            data: {
              facilities: facilities.filter((fac) => fac.id !== facility.id),
            },
          });
        },
      });
      return facility;
    },
    loading,
    error: Boolean(error),
  };
};

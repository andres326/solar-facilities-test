import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_FACILITY_MUTATION,
  DELETE_FACILITY_MUTATION,
  FACILITIES_QUERY,
  FACILITY_QUERY,
  UPDATE_FACILITY_MUTATION,
} from "../queries/facilities";

export const useFacilities = (userId) => {
  const { data, loading, error } = useQuery(FACILITIES_QUERY, {
    fetchPolicy: "network-only",
    variables: { userId },
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
        update: (cache, { data: { facility } }) => {
          const { facilities } = cache.readQuery({
            query: FACILITIES_QUERY,
            variables: { userId: input.userId },
          });

          cache.writeQuery({
            query: FACILITIES_QUERY,
            data: { facilities: [...facilities, facility] },
            variables: { userId: input.userId },
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
        update: (cache, { data: { facility } }) => {
          const { facilities } = cache.readQuery({
            query: FACILITIES_QUERY,
            variables: { userId: input.userId },
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
            variables: { userId: input.userId },
          });
        },
      });
      return facility;
    },
    loading,
    error: Boolean(error),
  };
};

export const useDeleteFacility = (userId) => {
  const [mutate, { loading, error }] = useMutation(DELETE_FACILITY_MUTATION);
  return {
    deleteFacility: async (id) => {
      const {
        data: { facility },
      } = await mutate({
        variables: { id },
        update: (cache, { data: { facility } }) => {
          const { facilities } = cache.readQuery({
            query: FACILITIES_QUERY,
            variables: { userId },
          });

          cache.writeQuery({
            query: FACILITIES_QUERY,
            data: {
              facilities: facilities.filter((fac) => fac.id !== facility.id),
            },
            variables: { userId },
          });
        },
      });
      return facility;
    },
    loading,
    error: Boolean(error),
  };
};

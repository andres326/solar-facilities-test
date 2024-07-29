import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ACCESS_TOKEN_KEY, GRAPHQL_URI } from "../util/constants";
import { useAuthContext } from "../context/useAuthContext";

export const useClient = () => {
  const { token } = useAuthContext();

  const client = new ApolloClient({
    uri: GRAPHQL_URI,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            facilities: {
              merge(existing, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { client };
};

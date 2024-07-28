import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URI } from "../util/constants";

export const client = new ApolloClient({
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
});

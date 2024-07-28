import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URI;

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

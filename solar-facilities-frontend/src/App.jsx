import { client } from "./graphql/index";
import { Dashboard } from "./pages/Dashboard";
import { Layout } from "./pages/_layout";
import { ApolloProvider } from "@apollo/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Dashboard />
      </Layout>
    </ApolloProvider>
  );
}

export default App;

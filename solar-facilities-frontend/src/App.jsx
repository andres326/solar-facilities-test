import { Route, Routes } from "react-router-dom";
import { client } from "./graphql/index";
import { Dashboard } from "./pages/Dashboard";
import { Layout } from "./pages/_layout";
import { ApolloProvider } from "@apollo/client";
import { FacilityPerformance } from "./pages/FacilityPerformance";

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/facility/:slug" element={<FacilityPerformance />} />
        </Routes>
      </Layout>
    </ApolloProvider>
  );
}

export default App;

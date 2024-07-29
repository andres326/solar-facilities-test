import { Route, Routes } from "react-router-dom";
import { client } from "./graphql/index";
import { Dashboard } from "./pages/Dashboard";
import { Layout } from "./pages/_layout";
import { ApolloProvider } from "@apollo/client";
import { FacilityPerformance } from "./pages/FacilityPerformance";
import { ROUTES } from "./util/routes";
import { SignIn } from "./pages/SignIn";
import { useAuthContext } from "./context/useAuthContext";
import { SignUp } from "./pages/SignUp";

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path={ROUTES.LOGIN} element={<SignIn />} />
              <Route path={ROUTES.REGISTER} element={<SignUp />} />
            </>
          ) : (
            <>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route
                path={ROUTES.FACILITY_GRAPH}
                element={<FacilityPerformance />}
              />
            </>
          )}
        </Routes>
      </Layout>
    </ApolloProvider>
  );
}

export default App;

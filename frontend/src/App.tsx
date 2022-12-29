import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Main from "./components/Main";
import NotFound from "./pages/NotFound";
// import HomePage from "./pages/HomePage";
import { GET_PASSERS } from "./queries/passerQueries";
import { GET_RUSHERS } from "./queries/rusherQueries";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";

// for getting rid of warning in console
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://express-nfl.onrender.com/graphql",
  // dev env
  // uri: "http://localhost:8000/graphql",
  cache,
});

const App = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <Router>
      <ApolloProvider client={client}>
        <div
          className={`flex flex-col lg:flex-row h-full lg:h-screen w-full font-montserrat ${
            darkMode ? "text-white" : "text-[#1f1f1f]"
          } `}
          data-testid="full"
        >

          <Routes>
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/" element={<AuthPage />} /> */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/passing" element={<Main query={GET_PASSERS} type="passer" />} />
            <Route path="/rushing" element={<Main query={GET_RUSHERS} type="rusher" />} />
            {/* <Route path="/receiving" element={<Main query={GET_RECEIVERS} />} type="receiver" /> */}
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
};

export default App;

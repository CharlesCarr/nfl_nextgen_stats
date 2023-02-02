import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./stores/store";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import PassPage from "./pages/PassPage";
import RushPage from "./pages/RushPage";

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
            <Route path="/" element={<LandingPage />} />
            <Route path="/passing" element={<PassPage />} />
            <Route path="/rushing" element={<RushPage />} />
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
};

export default App;

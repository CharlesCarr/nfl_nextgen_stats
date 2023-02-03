import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { RootState } from "./stores/store";
import NotFound from "./pages/not-found";
import Landing from "./pages/landing";
import Passing from "./pages/passing";
import Rushing from "./pages/rushing";
import Receiving from "./pages/receiving";

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
        >
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Landing />} />
            <Route path="/passing" element={<Passing />} />
            <Route path="/rushing" element={<Rushing />} />
            <Route path="/receiving" element={<Receiving />} />
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
};

export default App;

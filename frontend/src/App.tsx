import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Main from "./components/Main";

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
  cache,
});
console.log(client);

const App = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <ApolloProvider client={client}>
      <div
        className={`flex flex-col lg:flex-row h-full lg:h-screen w-full font-montserrat ${
          darkMode ? "text-white" : "text-[#1f1f1f]"
        } `}
        data-testid="full"
      >
        <NavBar />
        <Main />
      </div>
    </ApolloProvider>
  );
};

export default App;

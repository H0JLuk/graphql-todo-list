import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StoreProvider } from "./store/StoreProvider";

import App from "./App";

import "./styles.css";

const client = new ApolloClient({
  uri:
    "https://api-eu-central-1.graphcms.com/v2/ckrkccm9x1i3r01xn0zbb56e7/master",
  cache: new InMemoryCache()
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ApolloProvider>
  </StrictMode>,
  rootElement
);

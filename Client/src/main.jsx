import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import {
  BrowserRouter 
} from "react-router-dom";


import SpotifyTrial from "./Testing/SpotifyTrial";
import YoutubeTrial from "./Testing/YoutubeTrial"
import SoundCloudTrial from "./Testing/SoundcloudTrial";
import DriveTrial from "./Testing/DriveTrial";

import App from "./App";
import "./styles/index.css";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("queueit-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000" }));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "operationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

// client.query({query})
// .then((response)=> console.log(response.data))

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <BrowserRouter>
        <YoutubeTrial/>
        <SoundCloudTrial/>
        <DriveTrial/>
    </BrowserRouter>
  </ApolloProvider>
  // </React.StrictMode>,
);

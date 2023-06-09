import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";

import { REACT_APP_BASE_URL, REACT_APP_BASE_WSS } from "@env";

const httpLink = new HttpLink({
  uri: REACT_APP_BASE_URL,
});

const wsLink = new WebSocketLink({
  uri: REACT_APP_BASE_WSS,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const Client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default Client;

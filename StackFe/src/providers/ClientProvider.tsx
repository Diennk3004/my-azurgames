"use client";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
type Props = {};
const ClientProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: "same-origin"
  });
  const authLink = setContext(async (_, { headers }) => {
    const accessToken: string = process.env.NEXT_PUBLIC_ACCESS_TOKEN ? process.env.NEXT_PUBLIC_ACCESS_TOKEN.toString() : "";
    const token = localStorage.getItem(accessToken);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        "Apollo-Require-Preflight": "true"
      }
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export { ClientProvider };

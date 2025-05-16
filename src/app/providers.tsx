'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { WagmiProvider } from 'wagmi';
import { Toaster } from "sonner";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { config } from "@/lib/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/lib/graphql";

const httpLink = createHttpLink({
  uri: 'https://dev.base-sepolia.intuition-api.com/v1/graphql',
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://dev.base-sepolia.intuition-api.com/v1/graphql',
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname() ?? '/';
  const isHome = pathname === '/';

  useEffect(() => {
    const bodyClasses = document.body.classList;
    if (isHome) {
      bodyClasses.add('home');
    } else {
      bodyClasses.remove('home');
    }
  }, [isHome]);

  return (
    <>
      <Toaster position="top-center" />
      <SessionProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ApolloProvider client={client}>
              {props.children}
            </ApolloProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </SessionProvider>
    </>
  )
}
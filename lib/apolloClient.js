import { useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink,
} from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';
import gql from 'graphql-tag';

import { IsLoggedInDocument } from '@/lib/graphql';

export const localStorageKey = 'kiwisheets_token';

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    let token = '';
    if (typeof window !== 'undefined') {
      token = window.localStorage.getItem(localStorageKey);
    } else {
      // SSR token?
      token = '';
    }
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
        'client-name': 'Kiwisheets [web]',
        'client-version': '0.0.1',
      },
    };
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri:
    (process.env.NEXT_PUBLIC_BASE_DOMAIN || '') +
    process.env.NEXT_PUBLIC_API_URI,
  credentials: 'include',
});

const persistedQueriesLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true,
});

let client;

const isLoggedIn = () => {
  if (typeof window !== 'undefined') {
    return !!window.localStorage.getItem(localStorageKey);
  }
  return false;
};

const writeInitialData = () => {
  client.writeQuery({
    query: gql`
      query IsLoggedIn {
        isLoggedIn @client
      }
    `,
    data: {
      isLoggedIn: isLoggedIn(),
    },
  });
};

const testDef = gql`
  extend type Query {
    testDef: String!
  }
`;

const typeDefs = [IsLoggedInDocument, testDef];

const createApolloClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: from([persistedQueriesLink, authMiddleware, httpLink]),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
    queryDeduplication: true,
    typeDefs,
    ssrMode: typeof window === 'undefined',
  });

export function initializeApollo(initialState = null) {
  const aClient = client ?? createApolloClient();

  if (initialState) {
    const existingCache = aClient.extract();

    aClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') return aClient;

  if (!client) client = aClient;

  writeInitialData();

  client.onResetStore(writeInitialData);
  client.onClearStore(writeInitialData);

  return client;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

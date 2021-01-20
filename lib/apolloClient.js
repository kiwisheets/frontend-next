import { useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink,
} from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/link-persisted-queries';
import gql from 'graphql-tag';

import IS_LOGGED_IN from '@/graphql/queries/isLoggedIn';

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

let client;

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const isLoggedIn = () => {
  if (typeof window !== 'undefined') {
    return !!window.localStorage.getItem(localStorageKey);
  }
  return false;
};

const writeInitialData = () => {
  client.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: isLoggedIn(),
    },
  });
};

const createApolloClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      createPersistedQueryLink({
        useGETForHashedQueries: true,
      }),
      authMiddleware,
      httpLink,
    ]),
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

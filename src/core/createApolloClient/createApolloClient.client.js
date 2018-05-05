// @flow

import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
// import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
// import apolloLogger from 'apollo-link-logger';
import createCache from './createCache';

/* const link = from([
  onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.warn(`[Network error]: ${networkError}  -  Operation: ${operation}`);
  }),
  ...(__DEV__ ? [apolloLogger] : []),
/!*  split(
      ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
      },
      new HttpLink({
          uri: '/graphql',
          credentials: 'include',
      }),
      new WebSocketLink({
          uri: 'ws://localhost:4040/subscriptions',
          options: {
              reconnect: true
          },
      }),
  ),*!/
    new HttpLink({
        uri: '/graphql',
        credentials: 'include',
    }),
    new WebSocketLink({
        uri: 'ws://localhost:4040/subscriptions',
        options: {
            reconnect: true
        },
    }),

]); */

const link = split(
        ({ query }) => {
                const { kind, operation } = getMainDefinition(query);
                return (
                        kind === 'OperationDefinition' &&
                        operation === 'subscription'
                );
        },
        new HttpLink({
                uri: '/graphql',
                credentials: 'include',
        }),
        new WebSocketLink({
                uri: 'ws://localhost:4040/subscriptions',
                options: {
                        reconnect: true,
                },
        }),
);

const cache = createCache();

export default function createApolloClient() {
        return new ApolloClient({
                link,
                cache: cache.restore(window.App.apolloState),
                queryDeduplication: true,
                connectToDevTools: true,
        });
}

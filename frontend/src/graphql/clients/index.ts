import { ApolloClient, InMemoryCache } from '@apollo/client';

const mainClient = () =>
  new ApolloClient({
    uri: '',
    cache: new InMemoryCache(),
  });

export { mainClient };

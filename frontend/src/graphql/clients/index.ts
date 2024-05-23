import { ApolloClient, InMemoryCache } from '@apollo/client';

const mainClient = new ApolloClient({
  uri: import.meta.env.VITE_DEALERSHIPS_API_URL,
  cache: new InMemoryCache(),
});

export { mainClient };

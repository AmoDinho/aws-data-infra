import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { mainClient } from './graphql/clients/index.ts';
import NavBar from './components/ui/navbar';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={mainClient}>
      <NavBar />

      <App />
    </ApolloProvider>
  </React.StrictMode>
);

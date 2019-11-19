import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import BookList from './components/book-list/BookList';
import AddBook from './components/add-book/AddBook';

function App() {
//Apollo client setup
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
  });
  
  return (
    <ApolloProvider client={client}>
      <div id='main'>
        <h1>Mr Bonini's Library</h1>
        <BookList />
        <hr />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;

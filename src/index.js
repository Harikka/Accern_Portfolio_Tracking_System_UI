import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


const client = new ApolloClient({
    uri: 'http://localhost:9000/graphql?'
  });


ReactDOM.render( <ApolloProvider client={client}>
    <App /></ApolloProvider>, document.getElementById('root'));

registerServiceWorker();

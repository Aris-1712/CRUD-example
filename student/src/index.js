

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
import {createStore,compose,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
// import Reducer from './Reducer' 
import thunk from 'thunk'
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store=createStore(Reducer, composeEnhancers(applyMiddleware(thunk)))
const app=(
 <BrowserRouter basename='/student/'><App></App></BrowserRouter>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
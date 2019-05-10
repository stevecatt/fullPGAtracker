import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'
import thunk from 'redux-thunk'
import ReactTable from 'react-table'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import 'react-table/react-table.css'
import axios from 'axios'
import { setAuthenticationHeader } from './utils/authenticate'
import BaseLayout from './components/BaseLayout'
import Golf from './components/Golfscores'
import Login from './components/Login'
import Register from './components/Register'
// composeEnhancers is only for debugging purposes 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(
    applyMiddleware(thunk)
  ));

  setAuthenticationHeader(localStorage.getItem('jwtoken'))

ReactDOM.render(

<Provider store={store}> 
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/golf" component={Golf} />
        <App />
      </Switch>
    </BaseLayout>
  </BrowserRouter>     
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

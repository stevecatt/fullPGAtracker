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
import Logout from './components/Logout'
import Register from './components/Register'
import 'bootstrap/dist/css/bootstrap.min.css'
import Tabletest from './components/Tabletest';
import Userpage from './components/Userpage'
import requireAuth from './components/requireAuth'
import FaveTable from './components/FaveTable';
import Schedule from './components/Schedule'
import LandingPage from './components/LandingPage';
import History from  './components/History'
import Breakpoint, { BreakpointProvider } from 'react-socks';
import { setDefaultBreakpoints } from 'react-socks';

// composeEnhancers is only for debugging purposes 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(
    applyMiddleware(thunk)
  ));

  setAuthenticationHeader(localStorage.getItem('jwtoken'))

  setDefaultBreakpoints([
    { xs: 0 },
    { s: 376 },
    { m: 426 },
    { l: 769 },
    { xl: 1025 }
  ]);

ReactDOM.render(

<Provider store={store}> 
  <BrowserRouter>
  <BreakpointProvider>
    <BaseLayout>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/golf" component={Golf} />
        <Route path="/logout" component={Logout}/>
        <Route path="/userpage" component = {requireAuth(FaveTable)}/>
        <Route path="/schedule" component = {Schedule}/>
        <Route path="/history" component = {History}/>
       
        <App />
      </Switch>
    </BaseLayout>
    </BreakpointProvider>
  </BrowserRouter>     
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

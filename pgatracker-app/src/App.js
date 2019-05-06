import React,{Component} from '../node_modules/react';
import logo from './logo.svg';
import './App.css';
import Golf from './components/Golfscores'
import Weather from './components/Weather'

import Tabletest from './components/Tabletest'
import Login from './components/Login'
import Register from './components/Register'


class App extends Component {

  

  render() {
    return (
      <div>
        <Register/>
        <Login/>
        <Golf/>
        <Tabletest />
       
      
       
      </div>
    )
  }

}

export default App;

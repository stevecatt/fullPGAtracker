import React,{Component} from '../node_modules/react';
import logo from './logo.svg';
import './App.css';
import Golf from './components/Golfscores'
import Weather from './components/Weather'
import Userpage from './components/Userpage'
import Tabletest from './components/Tabletest'
import Login from './components/Login'
import Register from './components/Register'
import FaveTable from './components/FaveTable';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

  

  render() {
    return (
      <div>
        
        <Golf/>
        <FaveTable/>
        <Tabletest/>
       
      
       
      </div>
    )
  }

}

export default App;

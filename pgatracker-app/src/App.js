import React,{Component} from '../node_modules/react';
import logo from './logo.svg';
import './App.css';
import Golf from './components/Golfscores'
import Weather from './components/Weather'

class App extends Component {

  render() {
    return (
      <div>
        <Golf />
        <Weather/>
       
      </div>
    )
  }

}

export default App;

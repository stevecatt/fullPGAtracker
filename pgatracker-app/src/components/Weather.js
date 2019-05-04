import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'
import '../App.css';


class Weather extends Component {

    componentDidMount(){

        //bit sneeky they use cors on this
    //    let url = `https://www.pgatour.com/bin/data/feeds/weather.json/480`

    //    fetch(url)
    //    .then(response =>response.json())
    //    .then(json =>console.log(json))
    }



    render(){
        return (
            <h1>weather</h1>
        )
    }

}

const mapStateToProps = (state) => {
    return {
      
      tourId: state.tourId,
     

      
    }
  }
  
 
  


export default connect(mapStateToProps)(Weather)
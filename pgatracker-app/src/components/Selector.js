import React, {Component} from 'react';
import { connect } from 'react-redux'
import Select from 'react-select'
import * as actionTypes from '../store/actions/actionTypes'


//not using this at the moment

const golfTours = [
    { label: "PGA Tour", value: "r"},
    { label: "PGA Champions Tour", value: "s" },
    { label: "WEB.COM Tour", value: "h" },
    { label: "MACKENZIE Tour Canada", value: "c" },
    { label: "Latinoamérica", value:"m"}
   
  ];


  class Selector extends Component {
      constructor(){
        super()
        this.state={
          selectedOption: "r"


        }
      }

      componentDidMount(){
        this.props.onTourSelected(this.state.selectedOption)

      }

      handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption)
        console.log(selectedOption.value)
        this.props.onTourSelected(selectedOption.value)
      }

    render(){
      const { selectedOption } = this.state;
      return (
  
    <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <Select placeholder="Select Tour" value={selectedOption}
        onChange={this.handleChange} 
        options={ golfTours } />
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  
      )}
  }
  const mapDispatchToProps = (dispatch)=>{
    return {
      onTourSelected: (selectedTour)=> dispatch({type:actionTypes.SELECTED_TOUR,value:selectedTour})
    }
  }
  
  const mapStateToProps =(state)=>{
    return{
      isAuth: state.isAuthenticated
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Selector)

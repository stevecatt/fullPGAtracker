import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import * as actionCreators from '../store/actions/actionCreators'
import * as actionTypes from '../store/actions/actionTypes'
import ReactTable from "react-table";
import "react-table/react-table.css";
import Tabletest from './Tabletest';
import Golf from './Golfscores';
import * as urls from '../utils/urls';
import * as funcs from '../utils/dataFunctions'
import Breakpoint, { BreakpointProvider } from 'react-socks';
import { setDefaultBreakpoints } from 'react-socks';
import {Button} from "reactstrap"


class EuroTour extends Component {

    componentDidMount(){
        this.getEuroTour()
    }

    getEuroTour=()=>{
        let euro = "https://golf.jacoduplessis.co.za/?format=json"
        fetch (euro)
        .then(response=>response.json())
        .then((json)=>{
            console.log(json)
            this.props.onEuroFetched(json)
        })    


    }
    render(){
        const data = this.props.eplayers

        const fullColumns = [
    
  
            
            {
              Header:'Nationality',
              accessor: 'Country',
              filterable: true,
              style:{
                textAlign:"center",
                
              }
      
          },
    
              {
              Header:'Position',
              accessor: 'CurrentPosition',
              style:{
                textAlign:"center"
              }
      
          },
         
              {
              Header: 'Name',
              accessor: 'Name',
              filterable: true
            },
            
            {
              Header:'Today',
              accessor:'Today',
              soratble: false,
              style:{
                textAlign:"center"
              }
             
            },
            {
              Header:'Through',
              accessor:'After',
              style:{
                textAlign:"center"
              }
            },
            {
              Header: 'Total',
              accessor: 'Total',
              style:{
                textAlign:"center"
              }
            },
    
            
            
          ]




        return(
            <div className="container">
            <h1>European Tour</h1>
            <h4>{this.props.etournament}</h4>
            <ReactTable 
            data={data}
            columns={fullColumns}
            defaultPageSize = {10}
            pageSizeOptions = {[10, 20, 50]}
            showPaginationTop
            showPaginationBottom = {false}
            defaultFilterMethod={funcs.customFilter}
          />
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      
      etournament: state.euro.Tournament,
      eplayers:state.eplayers,
      
      
      
     

      
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      //onGolfFetched: () => dispatch(actionCreators.golfFetched()),
    
      
      onEuroFetched:(json)=>dispatch({type:actionTypes.EURO_FETCHED , euro: json.Leaderboards[1],eplayers: json.Leaderboards[1].Players})
      
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(EuroTour)
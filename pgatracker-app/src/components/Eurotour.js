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
import cheerio from "cheerio"
import request from 'request'


class EuroTour extends Component {

    componentDidMount(){
        this.getEuroTour()

        this.interval = setInterval(()=>{
            //gonna fire this when status of game is active 
           //console.log("how do i set the interval")
  
           
            this.getEuroTour()
          
  
         },300000)


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

    getCheerios =()=>{
      let euromobile= "https://app.europeantour.com"
      request ({
        method: 'GET',
        url: euromobile
      },(err,res,body)=>{
        if (err){
          console.log(err);
          // let $ =cheerio.load(body);
          // let tournament=$(".container")
          console.log(body)
        }
      })
    }
    render(){
        const data = this.props.eplayers

        const fullColumns = [
    
  
            
            {
              Header:'Nat',
              accessor: 'Country',
              filterable: true,
              maxWidth:50,
              style:{
                textAlign:"center",
                
              }
              
      
          },
    
              {
              Header:'Pos',
              accessor: 'CurrentPosition',
              maxWidth:35,
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
              Header:'Tod',
              accessor:'Today',
              soratble: false,
              maxWidth:35,
              style:{
                textAlign:"center"
              }
             
            },
            {
              Header:'Thr',
              accessor:'After',
              maxWidth:35,
              style:{
                textAlign:"center"
              }
            },
            {
              Header: 'Tot',
              accessor: 'Total',
              maxWidth:35,
              style:{
                textAlign:"center"
              }
            },
    
            
            
          ]




        return(
            <div className="container">
            <h1>European Tour</h1>
            <h4>{this.props.etournament}</h4>
            <div className="mob-table">
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
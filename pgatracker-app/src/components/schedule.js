import React, {Component} from 'react';
import { connect } from 'react-redux'
import Select from 'react-select'
import * as actionCreators from '../store/actions/actionCreators'
import * as actionTypes from '../store/actions/actionTypes'
import * as urls from '../utils/urls'
import '../App.css';
import axios from "axios"
import ReactTable from "react-table";
import "react-table/react-table.css";

class Schedule extends Component {

  constructor(){
    super()
    this.state={
      selectedOption: {label:"PGA TOUR",value:"r"},

      favorites:[]


    }
  }
  selectTournament=(tourId,tour)=>{
    //gets tid and tour id then feeds a history table
    console.log("fired",tourId,tour)
    let url = "https://statdata.pgatour.com/"+tour+"/"+tourId+"/leaderboard-v2mini.json"
    fetch(url)
    .then(response => response.json())
    .then((json)=>{
      this.props.onHistorySelected(json)
      console.log(json.leaderboard)
    }).then(()=>{
      this.props.history.push('/history')
    })

  }
  
    
    customFilter = (filter, row) => {
        const id = filter.pivotId || filter.id;
        if (row[id] !== null && typeof row[id] === "string") {
          return (row[id] !== undefined
            ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
            : true);
        }
      }
    
      handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption)
        console.log(selectedOption.value)
        this.props.onTourSelected(selectedOption.value)

      }
    
    
    
    render(){
        const { selectedOption } = this.state;
        let data = this.props.pga
        if(selectedOption.value == "r"){
          data = this.props.pga
        }else if (selectedOption.value =="s"){
          data = this.props.senior
        }else if (selectedOption.value == "h"){
          data = this.props.web
        }else if (selectedOption.value == "c"){
          data = this.props.canada
        }else if (selectedOption.value == "m"){
          data = this.props.latin
        }
        
        
        const columns = [
      
            {Header: 'View',
            Cell: props =>{
              return(
                <button className ="saveButton" onClick={()=>
                this.selectTournament(props.original.permNum,this.state.selectedOption.value)}>View Results</button>
              )
            }
          },
      
      
            
           
              {
              Header:'Tournament Name',
              accessor: 'trnName.official',
              style:{
                textAlign:"center"
              }
      
          },
              {
              Header: 'Start Date',
              accessor: 'date.start',
              filterable: true
            },
            {
              Header: 'Course Name',
              accessor: 'courses[0].courseName',
              filterable: true
            },
            {
              Header:'Champion',
              accessor:'champions[0].playerName.first',
              soratble: false,
              style:{
                textAlign:"center"
              }
             
            },
            {
              Header:'',
              accessor:'champions[0].playerName.last',
              style:{
                textAlign:"center"
              }
            },
            
            
          ]
        return (
            <div className="container">
               <div className="row">
                  <div className="col-md-4"></div>
                 <div className="col-md-4">
                <Select placeholder="Select Tour" value={selectedOption}
                  onChange={this.handleChange} 
                  options={ urls.golfTours } />
                </div>
                 <div className="col-md-4"></div>
            </div>
            <ReactTable
              data={data}
              columns={columns}
              defaultPageSize = {10}
              pageSizeOptions = {[10, 20, 50]}
              showPaginationTop
              showPaginationBottom = {false}
              defaultFilterMethod={this.customFilter}
            />
        </div>      
        )
    }
}


  
const mapDispatchToProps = (dispatch)=>{
    return {
      onTourSelected: (selectedTour)=> dispatch({type:actionTypes.SELECTED_TOUR,value:selectedTour}),
      onHistorySelected:(json)=>dispatch({type:actionTypes.HISTORY_SELECTED , golf: json.leaderboard,courses:json.leaderboard.courses, players :json.leaderboard.players, isStarted:json.leaderboard.is_started,isFinished:json.leaderboard.is_finished,roundState:json.leaderboard.round_state, tourId:json.leaderboard.tournament_id}),
    }
  }
  
  const mapStateToProps =(state)=>{
    return{
      isAuth: state.isAuthenticated,
      selectedTour:state.selectedTour,
      pga: state.pgaTournaments,
      senior: state.seniorTournaments,
      latin:state.latinTournaments,
      canada: state.canadaTournaments,
      web:state.webTournaments
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Schedule)
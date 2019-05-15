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
import Breakpoint, { BreakpointProvider } from 'react-socks';
import { setDefaultBreakpoints } from 'react-socks';

setDefaultBreakpoints([
  { xs: 0 },
  { s: 376 },
  { m: 500 },
  { l: 769 },
  { xl: 1025 }
]);

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
     // saves backups to database just in case  
    //   axios.post(urls.saveBackup,{
    //     title:json
    // }).then((response)=>{
    //   console.log(response)
    // })
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
        
        //mob site columns
        const mobColumns = [
      
          {Header: 'View',
          Cell: props =>{
            return(
              <button className ="miniSaveButton" onClick={()=>
              this.selectTournament(props.original.permNum,this.state.selectedOption.value)}></button>
            )
          },
          maxWidth:50,
        },
    
    
          
         
            {
            Header:'Tournament Name',
            accessor: 'trnName.short',
            style:{
              textAlign:"center"
            }
    
        },
            {
            Header: 'Start Date',
            accessor: 'date.start',
            maxWidth:100,
            filterable: true
          },
          
          
          {
            Header:'',
            accessor:'champions[0].playerName.last',
            filterable: true,
            maxWidth:150,
            style:{
              textAlign:"center"
            }
          },
          
          
        ]
        //full site columns
        const fullColumns = [
      
            {Header: 'View',
            Cell: props =>{
              return(
                <button  className ="SaveButton" onClick={()=>
                this.selectTournament(props.original.permNum,this.state.selectedOption.value)}>View</button>
              )
            },
            maxWidth:75,
          },
      
      
            
           
              {
              Header:'Tournament Name',
              accessor: 'trnName.short',
              style:{
                textAlign:"center"
              }
      
          },
              {
              Header: 'Start Date',
              accessor: 'date.start',
              maxWidth:100,
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
              filterable: true,
              maxWidth:150,
              style:{
                textAlign:"center"
              }
             
            },
            {
              Header:'',
              accessor:'champions[0].playerName.last',
              filterable: true,
              maxWidth:150,
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
            <Breakpoint l up>
            <ReactTable 
              data={data}
              columns={fullColumns}
              defaultPageSize = {10}
              pageSizeOptions = {[10, 20, 50]}
              showPaginationTop
              showPaginationBottom = {false}
              defaultFilterMethod={this.customFilter}
            />
           </Breakpoint>
           <Breakpoint l down>
            <ReactTable 
              data={data}
              columns={mobColumns}
              defaultPageSize = {10}
              pageSizeOptions = {[10, 20, 50]}
              showPaginationTop
              showPaginationBottom = {false}
              defaultFilterMethod={this.customFilter}
            />
           </Breakpoint>
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
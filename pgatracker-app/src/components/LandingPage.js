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
 

class LandingPage extends Component {
    constructor(){
    super()
    this.state={
      selectedOption: {label:"PGA TOUR",value:"r"},
      

    }
  }

  

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption)
    console.log("this is from the selector box")
    console.log(this.state.selectedOption.value)
    this.props.onTourSelected(selectedOption.value)
    let tour = selectedOption.value
    this.golfFetched(tour)
    //this.getUserFavorites()
   //this.props.onSchedualFetched(selectedOption.value)
  }

  scheduleFetched = (tour) =>{
    let url = 'https://statdata.pgatour.com/'+tour+'/current/schedule-v2.json'
    fetch(url)
    .then(schedule => schedule.json())
    .then((sched)=>{
      console.log("this is tour schedule",sched)

    })
  }


  golfFetched = (tour) => {

    //finds the current tour code then inputs the tour id into leaderboard to get current scores 
    
    //console.log(this.state.selectedOption.value)
    let url = 'https://statdata.pgatour.com/'+tour+'/current/message.json'

      fetch (url)
      .then(resp=> resp.json()) 
      .then((json)=>{
        console.log (json.tid)
        let tourId=json.tid
        let url = "https://statdata.pgatour.com/"+tour+"/"+tourId+"/leaderboard-v2mini.json"
        fetch(url)
        .then(response => response.json())
        .then((json)=>{
          console.log(json.leaderboard)
          this.props.onGolfFetched(json)
        }).then(()=>{
          console.log("good enough for not logged in ")
        })
      })
    
  }

    componentDidMount() {
      //console.log(this.state.selectedOption.value)
      let tour = this.state.selectedOption.value
        this.golfFetched(tour)
       
        
        
        this.props.onSchedualFetched()
        this.interval = setInterval(()=>{
          //gonna fire this when status of game is active 
         console.log("how do i set the interval")

        },5000)
        
        
      }
      componentWillUnmount(){
        clearInterval(this.interval)

      }


    render(){
      const data = this.props.players
      const columns = [
    
  
        {Header :"Image",
        Cell: props =>{
          return (
          <img src= {`https://pga-tour-res.cloudinary.com/image/upload/b_rgb:cecece,c_fill,d_headshots_default.png,f_jpg,g_face:center,h_65,q_auto,w_65/headshots_${props.original.player_id}.png`}/>
          )
        }
        },
          {
          Header:'Position',
          accessor: 'current_position',
          style:{
            textAlign:"center"
          }
  
      },
          {
          Header: 'First Name',
          accessor: 'player_bio.first_name',
          filterable: true
        },
        {
          Header: 'Last Name',
          accessor: 'player_bio.last_name',
          filterable: true
        },
        {
          Header:'Today',
          accessor:'today',
          soratble: false,
          style:{
            textAlign:"center"
          }
         
        },
        {
          Header:'Through',
          accessor:'thru',
          style:{
            textAlign:"center"
          }
        },
        {
          Header: 'Total',
          accessor: 'total',
          style:{
            textAlign:"center"
          }
        },
        
      ]
      let courses=this.props.courses.map((course)=>{
        console.log("looking for course",course)
        return <h4>{course.course_name}</h4>
      })
      const { selectedOption } = this.state;
        return (

            <div>
              <div className="container">
              <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
              <Select placeholder="Select Tour" value={selectedOption.value}
              onChange={this.handleChange} 
              options={ urls.golfTours } />
              </div>
              <div className="col-md-4"></div>
            </div>
         </div>
            <h1>{this.props.golfScores.tour_name}</h1>
            <h2>{this.props.golfScores.tournament_name}</h2>
          
            <h4>Round{this.props.golfScores.current_round}{this.props.golfScores.round_state}</h4>
            {courses}
            <div>
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

            
            
            </div>
            


        )
    }
}



const mapStateToProps = (state) => {
    return {
      
      golfScores: state.golfScores,
      leaderboard: state.golfscores,
      players:state.players,
      tourSelected: state.selectedTour,
      uid:state.uid,
      courses:state.courses
     

      
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      //onGolfFetched: () => dispatch(actionCreators.golfFetched()),
      onSchedualFetched: () => dispatch(actionCreators.scheduleFetched()),
      onTourSelected: (selectedTour)=> dispatch({type:actionTypes.SELECTED_TOUR,value:selectedTour}),
      onGolfFetched:(json)=>dispatch({type:actionTypes.GOLF_API_FETCHED , golf: json.leaderboard,courses:json.leaderboard.courses, players :json.leaderboard.players, isStarted:json.leaderboard.is_started,isFinished:json.leaderboard.is_finished,roundState:json.leaderboard.round_state, tourId:json.leaderboard.tournament_id}),
      onFavSelected: (favorites)=> dispatch({type:actionTypes.FAV_SELECTED,favorites:favorites}),
    }
  }
  


export default connect(mapStateToProps,mapDispatchToProps)(LandingPage)
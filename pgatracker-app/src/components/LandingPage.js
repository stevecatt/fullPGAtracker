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
import * as funcs from '../utils/dataFunctions'
 

setDefaultBreakpoints([
  { xs: 0 },
  { s: 376 },
  { m: 500},
  { l: 769 },
  { xl: 1025 }
]);

class LandingPage extends Component {
    constructor(){
    super()
    this.state={
      selectedOption: {label:"PGA TOUR",value:"r"},
      

    }
  }

  // customFilter = (filter, row) => {
  //   const id = filter.pivotId || filter.id;
  //   if (row[id] !== null && typeof row[id] === "string") {
  //     return (row[id] !== undefined
  //       ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
  //       : true);
  //   }
  // }


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
        //let url = "https://statdata/pgattour.com/r/480/leaderboard-v2mini.json"
        let url = "https://statdata.pgatour.com/"+tour+"/"+tourId+"/leaderboard-v2mini.json"
        fetch(url)
        .then(response => response.json())
        .then((json)=>{
          console.log(json.leaderboard)
          this.props.onGolfFetched(json)
          //saves backup to database just in case
        //   axios.post(urls.saveBackup,{
        //     title:json
        // }).then((response)=>{
        //   console.log(response)
        // })
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

      //using this for mobile site
      const mobColumns = [
    
  
        
        
          {
          Header:'Pos',
          accessor: 'current_position',
          maxWidth: 50,
          style:{
            textAlign:"center"
          }
  
      },
          {
          Header: 'First Name',
          accessor: 'player_bio.short_name',
          maxWidth: 50,
          filterable: true
        },
        {
          Header: 'Last Name',
          accessor: 'player_bio.last_name',
          filterable: true
        },
        
        
        {
          Header: 'Total',
          accessor: 'total',
          maxWidth: 50,
          style:{
            textAlign:"center"
          }
        },
        
      ]

      //use this for full site
      const fullColumns = [
    
  
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

            <div className="container">
            <h2>{this.props.golfScores.tour_name}</h2>
              <div>
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
           
            <h3>{this.props.golfScores.tournament_name}</h3>
          
            <h4>Round{"   "}{this.props.golfScores.current_round}<h4>

            </h4>Status:{"   "}{this.props.golfScores.round_state}</h4>
            {courses}
            <Breakpoint l down>
            <div>
            <ReactTable
                data={data}
                columns={mobColumns}
                defaultPageSize = {10}
                pageSizeOptions = {[10, 20, 50]}
                showPaginationTop
                showPaginationBottom = {false}
                defaultFilterMethod={funcs.customFilter}
              />
            


          
            </div>
            </Breakpoint>
            <Breakpoint l up>
            <div>
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
          </Breakpoint>    

            
            
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
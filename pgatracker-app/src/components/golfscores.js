import React, {Component} from 'react';
import { connect } from 'react-redux'
import Select from 'react-select'
import * as actionCreators from '../store/actions/actionCreators'
import * as actionTypes from '../store/actions/actionTypes'
import '../App.css';


const golfTours = [
  { label: "PGA Tour", value: "r"},
  { label: "PGA Champions Tour", value: "s" },
  { label: "WEB.COM Tour", value: "h" },
  { label: "MACKENZIE Tour Canada", value: "c" },
  { label: "Latinoamérica", value:"m"}
 
];


class Golf extends Component {
    constructor(){
    super()
    this.state={
      selectedOption: {label:"PGA TOUR",value:"r"}


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
   //this.props.onSchedualFetched(selectedOption.value)
  }


  golfFetched = (tour) => {

    //finds the current tour code then inputs the tour id into leaderboard to get current scores 
    
    console.log(this.state.selectedOption.value)
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
        })
      })
    
  }

    componentDidMount() {
      console.log(this.state.selectedOption.value)
      let tour = this.state.selectedOption.value
        this.golfFetched(tour)
        //this.props.onGolfFetched()
        //this.props.onSchedualFetched()
        this.interval = setInterval(()=>{
          //gonna fire this when status of game is active 
         console.log("how do i set the interval")

        },5000)
        
        
      }
      componentWillUnmount(){
        clearInterval(this.interval)

      }


    render(){
      const { selectedOption } = this.state;
        return (

            <div>
              <div className="container">
              <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
              <Select placeholder="Select Tour" value={selectedOption.value}
              onChange={this.handleChange} 
              options={ golfTours } />
              </div>
              <div className="col-md-4"></div>
            </div>
         </div>
            <h1>{this.props.golfScores.tour_name}</h1>
            <h2>{this.props.golfScores.tournament_name}</h2>
            <h3>{this.props.golfScores.round_state}</h3>
           
          

            
            
            </div>
            


        )
    }
}



const mapStateToProps = (state) => {
    return {
      
      golfScores: state.golfScores,
      leaderboard: state.golfscores,
      players:state.players,
      tourSelected: state.selectedTour
     
     

      
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      //onGolfFetched: () => dispatch(actionCreators.golfFetched()),
      //onSchedualFetched: (tourSelected) => dispatch(actionCreators.scheduleFetched()),
      onTourSelected: (selectedTour)=> dispatch({type:actionTypes.SELECTED_TOUR,value:selectedTour}),
      onGolfFetched:(json)=>dispatch({type:actionTypes.GOLF_API_FETCHED , golf: json.leaderboard, players :json.leaderboard.players, isStarted:json.leaderboard.is_started,isFinished:json.leaderboard.is_finished,roundState:json.leaderboard.round_state, tourId:json.leaderboard.tournament_id})
    }
  }
  


export default connect(mapStateToProps,mapDispatchToProps)(Golf)
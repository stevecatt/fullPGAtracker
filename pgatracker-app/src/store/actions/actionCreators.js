import * as actionTypes from './actionTypes'
import axios from 'axios'


export const golfFetched = () => {

  //finds the current tour code then inputs the tour id into leaderboard to get current scores 
  return dispatch => {
    axios.get('https://statdata.pgatour.com/r/current/message.json')
    .then(resp=> {
      //console.log (resp.data.tid)
      let tourId=resp.data.tid
      let url = "https://statdata.pgatour.com/r/"+tourId+"/leaderboard-v2mini.json"
      
     

                axios.get(url)
              .then(json => {
             console.log(json.data.leaderboard)
            dispatch({type:actionTypes.GOLF_API_FETCHED , golf: json.data.leaderboard, players :json.data.leaderboard.players, isStarted:json.data.leaderboard.is_started,isFinished:json.data.leaderboard.is_finished,roundState:json.data.leaderboard.round_state, tourId:json.data.leaderboard.tournament_id })
     
    })
  })
  }
}

export const scheduleFetched =() =>{
  //gets the annual schedule
  return dispatch =>{
    fetch ('https://statdata.pgatour.com/r/current/schedule-v2.json')
    .then(response => response.json())
    .then((shed)=> {
      console.log(shed)
      dispatch({type:actionTypes.GOLF_SCHEDULE_FETCHED , schedule: shed})
    })
  }
}



//https://www.pgatour.com/bin/data/feeds/weather.json/r480 weather stuff
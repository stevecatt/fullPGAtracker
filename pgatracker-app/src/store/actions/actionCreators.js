import * as actionTypes from './actionTypes'


export const golfFetched = () => {

  //finds the current tour code then inputs the tour id into leaderboard to get current scores 
  return dispatch => {
    fetch('https://statdata.pgatour.com/r/current/message.json')
    .then(resp=> resp.json())
    .then(j => {
      console.log (j.tid)
      let tourId=j.tid
      let url = "https://statdata.pgatour.com/r/"+tourId+"/leaderboard-v2mini.json"
      
     

                fetch(url)
              .then(response => response.json())
              .then(json => {
             console.log(json)
            dispatch({type:actionTypes.GOLF_API_FETCHED , golf: json.leaderboard, players :json.leaderboard.players, isStarted:json.leaderboard.is_started,isFinished:json.leaderboard.is_finished,roundState:json.leaderboard.round_state, tourId:json.leaderboard.tournament_id })
     
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
import * as actionTypes from './actionTypes'
import axios from 'axios'

//needed to use this inside of golfscores app to get access to state.
// export const golfFetched = () => {

//   //finds the current tour code then inputs the tour id into leaderboard to get current scores 
//   return dispatch => {
//     fetch('https://statdata.pgatour.com/m/current/message.json')
//     .then(resp=> resp.json()) 
//     .then((json)=>{
//       //console.log (resp.data.tid)
//       let tourId=json.tid
//       let url = "https://statdata.pgatour.com/m/"+tourId+"/leaderboard-v2mini.json"
      
     

//               fetch(url)
//               .then(response => response.json())
//               .then((json)=>{
//              console.log(json.leaderboard)
//             dispatch({type:actionTypes.GOLF_API_FETCHED , golf: json.leaderboard, players :json.leaderboard.players, isStarted:json.leaderboard.is_started,isFinished:json.leaderboard.is_finished,roundState:json.leaderboard.round_state, tourId:json.leaderboard.tournament_id })
     
//     })
//   })
//   }
// }

export const scheduleFetched =() =>{
  //gets the annual schedule
  return dispatch =>{
    fetch ('https://statdata.pgatour.com/r/current/schedule-v2.json')
    .then(response => response.json())
    .then((shed)=> {
      //console.log(shed)
      dispatch({type:actionTypes.GOLF_SCHEDULE_FETCHED , schedule: shed, pga: shed.years[0].tours[0].trns, champ:shed.years[0].tours[1].trns, web: shed.years[0].tours[2].trns, latino:shed.years[0].tours[3].trns, canada:shed.years[0].tours[4].trns })
    })
  }
}



//https://www.pgatour.com/bin/data/feeds/weather.json/r480 weather stuff
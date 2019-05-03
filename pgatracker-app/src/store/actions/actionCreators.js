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
             console.log(json.leaderboard.players)
            dispatch({type:actionTypes.GOLF_API_FETCHED , golf: json.leaderboard, players :json.leaderboard.players})
     
    })
  })
  }
}

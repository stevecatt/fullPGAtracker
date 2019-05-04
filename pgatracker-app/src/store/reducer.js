import * as actionTypes from './actions/actionTypes'


const initialState = {
    golfScores: [],
    players: [],
    schedule: [],
    isFinished:false,
    isStarted:false,
    roundState:"",
    tourId:0,
    test:22
  }
  
  const reducer = (state = initialState, action) => {
  
    switch(action.type) {
      case actionTypes.GOLF_API_FETCHED:
        return {
          ...state,
          golfScores: action.golf,
          players:action.players,
          isFinished:action.isFinished,
          isStarted:action.isStarted,
          roundState:action.roundState,
          tourId:action.tourId
          
          
        }
      case actionTypes.GOLF_SCHEDULE_FETCHED:
        return {
          ...state,
          schedule: action.schedule
        }
    }
  
    return state
  }
  
  export default reducer
  
import * as actionTypes from './actions/actionTypes'


const initialState = {
    golfScores: [],
    players: [],
    schedule: [],
    isFinished:false,
    isStarted:false,
    roundState:"",
    tourId:0,
    test:22,
    isAuthenticated:false,
    selectedTour:"",
    uid:0
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
          tourId:action.tourId,
          
          
          
        }
      case actionTypes.GOLF_SCHEDULE_FETCHED:
        return {
          ...state,
          schedule: action.schedule
        }
        case actionTypes.IS_AUTHENITCATED:
        return{
          ...state,
          isAuthenticated: action.token != null ? true : false,
          uid:action.uid
        }
        case actionTypes.SELECTED_TOUR:
        return{
          ...state,
          selectedTour:action.value
        }
        case 'LOGOUT':
        return{
          ...state,
          isAuthenticated: false


        }

    }
  
    return state
  }
  
  export default reducer
  
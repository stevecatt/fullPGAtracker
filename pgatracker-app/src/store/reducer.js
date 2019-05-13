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
    uid:0,
    favorites:[],
    courses:[],
    pgaTournaments:[],
    seniorTournaments:[],
    webTournaments:[],
    latinTournaments:[],
    canadaTournaments:[],
    golfHistoryScores: [],
    playersHistory:{},
    isFinishedHistory:"",
    isStartedHistory:"",
    roundStateHistory:"",
    tourIdHistory:"",
    coursesHistory:[]
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
          courses:action.courses
          
          
        }
      case actionTypes.GOLF_SCHEDULE_FETCHED:
        return {
          ...state,
          schedule: action.schedule,
          pgaTournaments:action.pga,
          seniorTournaments:action.champ,
          webTournaments:action.web,
          latinTournaments:action.latino,
          canadaTournaments:action.canada
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
        case actionTypes.FAV_SELECTED:
        return{
          ...state,
          favorites:action.favorites
        }
        case actionTypes.HISTORY_SELECTED:
        return {
          ...state,
          golfHistoryScores: action.golf,
          playersHistory:action.players,
          isFinishedHistory:action.isFinished,
          isStartedHistory:action.isStarted,
          roundStateHistory:action.roundState,
          tourIdHistory:action.tourId,
          coursesHistory:action.courses
          
          
        }


    }
  
    return state
  }
  
  export default reducer
  
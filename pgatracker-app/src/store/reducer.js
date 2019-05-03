import * as actionTypes from './actions/actionTypes'


const initialState = {
    golfScores: [],
    players: [],
    test:22
  }
  
  const reducer = (state = initialState, action) => {
  
    switch(action.type) {
      case actionTypes.GOLF_API_FETCHED:
        return {
          ...state,
          golfScores: action.golf,
          players:action.players
        }
      case 'POST_FETCHED':
        return {
          ...state,
          posts: action.posts
        }
    }
  
    return state
  }
  
  export default reducer
  
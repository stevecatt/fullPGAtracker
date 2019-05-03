import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

class Golf extends Component {

    componentDidMount() {
        this.props.onGolfFetched()
        
      }


    render(){
        return (

            <div><h1>{this.props.golfScores.tour_name}</h1>
            <h2>{this.props.golfScores.tournament_name}</h2>

            <ul>{this.props.players.map((p)=> <li key = {p.player_id}>{p.current_position}__{p.player_bio.first_name}__{p.player_bio.last_name}__{p.total}__{p.thru}__{p.today}</li>)}</ul>
            
            </div>
            


        )
    }
}



const mapStateToProps = (state) => {
    return {
      //postList: state.posts.filter(p => p.userId == 1)
      golfScores: state.golfScores,
      leaderboard: state.golfscores,
      players:state.players,
      test:state.test

      
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onGolfFetched: () => dispatch(actionCreators.golfFetched())
    }
  }
  


export default connect(mapStateToProps,mapDispatchToProps)(Golf)
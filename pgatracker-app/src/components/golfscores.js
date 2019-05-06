import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'
import '../App.css';

class Golf extends Component {

    componentDidMount() {
        this.props.onGolfFetched()
        this.props.onSchedualFetched()
        this.interval = setInterval(()=>{
          //gonna fire this when status of game is active 
         console.log("how do i set the interval")

        },5000)
        
        
      }
      componentWillUnmount(){
        clearInterval(this.interval)

      }


    render(){
        return (

            <div>
            <h1>{this.props.golfScores.tour_name}</h1>
            <h2>{this.props.golfScores.tournament_name}</h2>
            <h3>{this.props.golfScores.round_state}</h3>
           
          

            <ul>{this.props.players.map((p)=> <li key = {p.player_id}><img src= {`https://pga-tour-res.cloudinary.com/image/upload/b_rgb:cecece,c_fill,d_headshots_default.png,f_jpg,g_face:center,h_65,q_auto,w_65/headshots_${p.player_id}.png`}/>
            {p.current_position}__{p.player_bio.country}__{p.current_position}__{p.player_bio.first_name}__{p.player_bio.last_name}__{p.today}__{p.thru}__{p.total} 
            </li>)}
            </ul>
            
            </div>
            


        )
    }
}



const mapStateToProps = (state) => {
    return {
      
      golfScores: state.golfScores,
      leaderboard: state.golfscores,
      players:state.players,
     
      test:state.test

      
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onGolfFetched: () => dispatch(actionCreators.golfFetched()),
      onSchedualFetched: () => dispatch(actionCreators.scheduleFetched())
    }
  }
  


export default connect(mapStateToProps,mapDispatchToProps)(Golf)
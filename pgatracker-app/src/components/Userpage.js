import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import * as actionTypes from '../store/actions/actionTypes'
import * as urls from '../utils/urls'
//import { getUserFavorites } from '../utils/getDataFunctions'



import ReactTable from "react-table";
import "react-table/react-table.css";



class Userpage extends Component{
    constructor(){
        super()
        this.state={
            favorites:[]

        }
    }


getUserFavorites =()=>{
    let favorites =[]
    axios.post(urls.getFavorites,{
        uid:this.props.uid
    })
    .then(response =>{
        console.log(response.data.favorites)
       
        let ids = response.data.favorites
        let i=0
        for(i=0;i<ids.length;i++){
            console.log(ids[i].pga_id)
            
            
            let favoritepush= this.props.players.filter(player=>player.player_id == ids[i].pga_id)
            if (favoritepush.length > 0){
                favorites.push(favoritepush)

            }
           
            console.log(favoritepush)
            
            

            
        }
       this.setState({
           favorites:favorites

       })
       this.props.onFavSelected(this.state.favorites)

   
    })
   // console.log("this is outside",favorites)
}

componentDidMount(){
    // let favorites =[]
    this.getUserFavorites()
    //this was testing to see if i could figure out remote function
    // this.setState({
    //                favorites:favorites
        
    //            })
    //  this.props.onFavSelected(this.state.favorites)
   // this.props.onFavSelected(this.state.favorites)
}

    render(){

        


        return(
            <div><h1>whats up</h1>
            
            






            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      
      golfScores: state.golfScores,
      leaderboard: state.golfscores,
      players:state.players,
      uid:state.uid,
     
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
     
      onFavSelected: (favorites)=> dispatch({type:actionTypes.FAV_SELECTED,favorites:favorites}),
     
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Userpage);
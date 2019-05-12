import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import * as actionTypes from '../store/actions/actionTypes'



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
    axios.post('http://localhost:8080/get-favorites',{
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
    this.getUserFavorites()
   // this.props.onFavSelected(this.state.favorites)
}

    render(){

        let g=this.state.favorites.map((p)=>{
            console.log("this is p",p[0].player_id)
            return  <li key = {p[0].player_id}><img src= {`https://pga-tour-res.cloudinary.com/image/upload/b_rgb:cecece,c_fill,d_headshots_default.png,f_jpg,g_face:center,h_65,q_auto,w_65/headshots_${p[0].player_id}.png`}/>
            {p[0].current_position}__{p[0].player_bio.country}__{p[0].current_position}__{p[0].player_bio.first_name}__{p[0].player_bio.last_name}__{p[0].today}__{p[0].thru}__{p[0].total} 
           </li>
               
           
        })
        console.log("this is g",g)



        return(
            <div><h1>Favorites</h1>
            <ul>{g}</ul>
            






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
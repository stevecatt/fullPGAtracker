import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import * as actionTypes from '../store/actions/actionTypes'


import ReactTable from "react-table";
import "react-table/react-table.css";
import Tabletest from './Tabletest';
import Golf from './Golfscores';
import * as urls from '../utils/urls';
import * as funcs from '../utils/getDataFunctions'

class FaveTable extends Component {
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
           // console.log(ids[i].pga_id)
            
            
            let favoritepush= this.props.players.filter(player=>player.player_id == ids[i].pga_id)
            if (favoritepush.length > 0){
                favorites.push(favoritepush)

            }
           
            //console.log(favoritepush)
            
            

            
        }
       this.setState({
           favorites:favorites

       })
       this.props.onFavSelected(this.state.favorites)

   
    })
   // console.log("this is outside",favorites)
}



//use this to remove the pid to database
  removeFavourite= (id) => {
    console.log(id,this.props.uid)
    axios.post(urls.removeFavorite ,{
      playerId : id,
      userId: this.props.uid


    
    
    }).then(response =>{
     this.getUserFavorites()
    //  this.setState({
    //   favorites:favorites
    //  })

    //  this.props.onFavSelected(this.state.favorites)


      console.log(response)
    })
  }
  
  


  customFilter = (filter, row) => {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null && typeof row[id] === "string") {
      return (row[id] !== undefined
        ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
        : true);
    }
  }
  
  render() {

    let favData=[]
    
    let favs= this.props.favorites
    let i = 0
    for (i=0; i<favs.length;i++){
      let favor=favs[i]
      let o=0
      for (o=0;o<favor.length;o++){
        //console.log("this is favor",favor[o])
        let newFavoritePush = favor[o]
        favData.push(newFavoritePush)

      }
      //console.log("this is favdata",favData)
      
    }

    let data=favData
    //console.log("this is data",data)

    const columns = [
      
      {Header: 'Remove',
      Cell: props =>{
        return(
          <button className ="removeButton" onClick={()=>
          this.removeFavourite(props.original.player_id)}>Delete</button>
        )
      }
    },


      {Header :"Image",
      Cell: props =>{
        return (
        <img src= {`https://pga-tour-res.cloudinary.com/image/upload/b_rgb:cecece,c_fill,d_headshots_default.png,f_jpg,g_face:center,h_65,q_auto,w_65/headshots_${props.original.player_id}.png`}/>
        )
      }
      },
        {
        Header:'Position',
        accessor: 'current_position',
        style:{
          textAlign:"center"
        }

    },
        {
        Header: 'First Name',
        accessor: 'player_bio.first_name',
        filterable: true
      },
      {
        Header: 'Last Name',
        accessor: 'player_bio.last_name',
        filterable: true
      },
      {
        Header:'Today',
        accessor:'today',
        soratble: false,
        style:{
          textAlign:"center"
        }
       
      },
      {
        Header:'Through',
        accessor:'thru',
        style:{
          textAlign:"center"
        }
      },
      {
        Header: 'Total',
        accessor: 'total',
        style:{
          textAlign:"center"
        }
      },
      
    ]
  

    return (
          <div>
              <Golf/>
              <ReactTable
                data={data}
                columns={columns}
                noDataText="Login to view Favorites"
                minRows={0}
                defaultPageSize = {5}
                pageSizeOptions = {[5, 10, 150]}
                showPaginationTop
                showPaginationBottom = {false}
                defaultFilterMethod={this.customFilter}
              />
              <Tabletest/>
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
      favorites:state.favorites
     
      

      
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
     
      onFavSelected: (favorites)=> dispatch({type:actionTypes.FAV_SELECTED,favorites:favorites}),
     
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(FaveTable);
import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import * as actionTypes from '../store/actions/actionTypes'
import * as urls from '../utils/urls'
import * as funcs from '../utils/dataFunctions'


import ReactTable from "react-table";
import "react-table/react-table.css";
import Breakpoint, { BreakpointProvider } from 'react-socks';
import { setDefaultBreakpoints } from 'react-socks';

setDefaultBreakpoints([
  { xs: 0 },
  { s: 376 },
  { m: 500 },
  { l: 769 },
  { xl: 1025 }
]);

class Tabletest extends Component {

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

// use this to save the pid to database
  saveFavorite= (id) => {
    console.log(id)
    axios.post(urls.saveFavorite,{
      playerId : id,
      userId: this.props.uid
    
    }).then(response =>{
      //add a function to select the players from the api. hopefully
      this.getUserFavorites()
      console.log(response)
    })
  }
  
  


  // customFilter = (filter, row) => {
  //   const id = filter.pivotId || filter.id;
  //   if (row[id] !== null && typeof row[id] === "string") {
  //     return (row[id] !== undefined
  //       ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
  //       : true);
  //   }
  // }
  
  render() {
    const data = this.props.players
    console.log(this.props.players)

    const mobColumns = [
      
      {Header: 'S',
      Cell: props =>{
        return(
          <button className ="miniSaveButton" onClick={()=>
          this.saveFavorite(props.original.player_id)}></button>
        )
      },
      maxWidth:50,
    },


      
        {
        Header:'Pos',
        accessor: 'current_position',
        maxWidth:50,
        style:{
          textAlign:"center"
        }

    },
        {
        Header: 'First Name',
        accessor: 'player_bio.short_name',
        maxWidth:50,
        filterable: true
      },
      {
        Header: 'Last Name',
        accessor: 'player_bio.last_name',
        filterable: true
      },
      
      
      {
        Header: 'Total',
        accessor: 'total',
        maxWidth:50,
        style:{
          textAlign:"center"
        }
      },
      
    ]

    const fullColumns = [
      
      {Header: 'Save',
      Cell: props =>{
        return(
          <button className ="saveButton" onClick={()=>
          this.saveFavorite(props.original.player_id)}>Save</button>
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
              <Breakpoint l up>
              <ReactTable
                data={data}
                columns={fullColumns}
                defaultPageSize = {10}
                pageSizeOptions = {[10, 20, 50]}
                showPaginationTop
                showPaginationBottom = {false}
                defaultFilterMethod={funcs.customFilter}
              />
              </Breakpoint>
               <Breakpoint l down>
               <ReactTable
                data={data}
                columns={mobColumns}
                defaultPageSize = {10}
                pageSizeOptions = {[10, 20, 50]}
                showPaginationTop
                showPaginationBottom = {false}
                defaultFilterMethod={funcs.customFilter}
              />
               </Breakpoint>
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
  

export default connect(mapStateToProps,mapDispatchToProps )(Tabletest);
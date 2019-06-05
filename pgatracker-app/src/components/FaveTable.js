import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import * as actionTypes from '../store/actions/actionTypes'
import ReactTable from "react-table";
import "react-table/react-table.css";
import Tabletest from './Tabletest';
import Golf from './Golfscores';
import * as urls from '../utils/urls';
import * as funcs from '../utils/dataFunctions'
import Breakpoint, { BreakpointProvider } from 'react-socks';
import { setDefaultBreakpoints } from 'react-socks';
import {Button} from "reactstrap"

setDefaultBreakpoints([
  { xs: 0 },
  { s: 376 },
  { m: 500},
  { l: 769 },
  { xl: 1025 }
]);

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
        //.log(response.data.favorites)
       
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
    //console.log(id,this.props.uid)
    axios.post(urls.removeFavorite ,{
      playerId : id,
      userId: this.props.uid


    
    
    }).then(response =>{
     this.getUserFavorites()
    //  this.setState({
    //   favorites:favorites
    //  })

    //  this.props.onFavSelected(this.state.favorites)


     // console.log(response)
    })
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

    const mobColumns = [
      
      {Header: 'R',
      Cell: props =>{
        return(
          <Button style ={{padding:'2px 7px 0'}} className ="miniRemoveButton btn btn-danger" onClick={()=>
          this.removeFavourite(props.original.player_id)}>*</Button>
        )
      },
      maxWidth:50,
    },


      
    {
      Header:'Pos',
      accessor: 'current_position',
      maxWidth: 35,
      style:{
        textAlign:"center",
      
        
      }

  },
      {
      Header: '',
      accessor: 'player_bio.short_name',
      maxWidth: 30,
      filterable: true
    },
    {
      Header: 'Last Name',
      accessor: 'player_bio.last_name',
      filterable: true,
      
    },
    {
      Header: 'Tru',
      accessor: 'thru',
      filterable: false,
      maxWidth:35,
    },
    
    {
      Header: 'Tot',
      accessor: 'total',
      maxWidth: 35,
      style:{
        textAlign:"center"
      }
    },

    {
      Header: 'Rank',
      
      accessor: 'rankings.cup_rank',
      maxWidth:60,
      style:{
        textAlign:"center",
      
      
      }
    },
      
    ]

    const fullColumns = [
      
      {Header: 'Remove',
      Cell: props =>{
        return(
          <Button className ="removeButton btn btn-danger" onClick={()=>
          this.removeFavourite(props.original.player_id)}>Remove</Button>
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
        Header:'Nationality',
        accessor: 'player_bio.country',
        filterable: true,
        style:{
          textAlign:"center",
          
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
      {
        Header: 'Cup Rank',
        accessor: 'rankings.cup_rank',
        style:{
          textAlign:"center"
        }
      },
      
    ]
  

    return (
          <div className="container">
              <Golf></Golf>
              <Breakpoint l up>
              <ReactTable
                data={data}
                columns={fullColumns}
                noDataText="Add Favorites"
                minRows={0}
                defaultPageSize = {5}
                pageSizeOptions = {[5, 10, 150]}
                showPaginationTop
                showPaginationBottom = {false}
                defaultFilterMethod={funcs.customFilter}
              />
              </Breakpoint>
              <Breakpoint l down>
              <div className="mob-table">
              <ReactTable
                data={data}
                columns={mobColumns}
                noDataText="Login to view Favorites"
                minRows={0}
                defaultPageSize = {5}
                pageSizeOptions = {[5, 10, 150]}
                showPaginationTop
                showPaginationBottom = {false}
                defaultFilterMethod={funcs.customFilter}
              />
              </div>
              </Breakpoint>
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
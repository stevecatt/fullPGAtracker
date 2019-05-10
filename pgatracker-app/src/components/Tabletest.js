import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'



import ReactTable from "react-table";
import "react-table/react-table.css";

class Tabletest extends Component {



// use this to save the pid to database
  saveFavourite= (id) => {
    console.log(id)
    axios.post('http://localhost:8080/save-favorite',{
      playerId : id,
      userId: this.props.uid
    
    }).then(response =>{
      //add a function to select the players from the api. hopefully
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
    const data = this.props.players
    console.log(this.props.players)

    const columns = [
      
      {Header: 'Actions',
      Cell: props =>{
        return(
          <button className ="saveButton" onClick={()=>
          this.saveFavourite(props.original.player_id)}>Save</button>
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
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize = {10}
                pageSizeOptions = {[10, 20, 50]}
                showPaginationTop
                showPaginationBottom = {false}
                defaultFilterMethod={this.customFilter}
              />
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
  

export default connect(mapStateToProps)(Tabletest);
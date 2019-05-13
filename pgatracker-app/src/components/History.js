import React, {Component} from 'react';
import { connect } from 'react-redux'
import Select from 'react-select'
import * as actionCreators from '../store/actions/actionCreators'
import * as actionTypes from '../store/actions/actionTypes'
import * as urls from '../utils/urls'
import '../App.css';
import axios from "axios"
import ReactTable from "react-table";
import "react-table/react-table.css";
 

class History extends Component {
    

    render(){

        const data = this.props.players
        let courses=this.props.courses.map((course)=>{
            console.log("looking for course",course)
            return <h4>{course.course_name}</h4>
        })

        const columns = [
      
    
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
        return(
            <div>
            <h1>{this.props.golfScores.tour_name}</h1>
            <h2>{this.props.golfScores.tournament_name}</h2>
          
            <h4>Round{this.props.golfScores.current_round}{this.props.golfScores.round_state}</h4>
            {courses}
            <div>
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize = {10}
                pageSizeOptions = {[10, 20, 50]}
                showPaginationTop
                showPaginationBottom = {false}
                defaultFilterMethod={this.customFilter}
              /></div>
              </div>
        )
    }


    

}

const mapStateToProps = (state) => {
    return {
      
      golfScores: state.golfHistoryScores,
      leaderboard: state.golfHistoryscores,
      players:state.playersHistory,
      tourSelected: state.selectedHistoryTour,
      uid:state.uid,
      courses:state.coursesHistory
     

      
    }
  }


  export default connect(mapStateToProps)(History)
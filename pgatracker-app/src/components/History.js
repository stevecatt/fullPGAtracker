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
import * as funcs from '../utils/dataFunctions'
import Breakpoint, { BreakpointProvider } from 'react-socks';
import { setDefaultBreakpoints } from 'react-socks';

setDefaultBreakpoints([
  { xs: 0 },
  { s: 576 },
  { m: 768 },
  { l: 992 },
  { xl: 1200 }
]);
 

class History extends Component {


    // customFilter = (filter, row) => {
    //     const id = filter.pivotId || filter.id;
    //     if (row[id] !== null && typeof row[id] === "string") {
    //       return (row[id] !== undefined
    //         ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
    //         : true);
    //     }
    //   }
    

    render(){

        const data = this.props.players
        let courses=this.props.courses.map((course)=>{
            console.log("looking for course",course)
            return <h4>{course.course_name}</h4>
        })

        const mobColumns = [
    
  
        
        
            {
            Header:'Pos',
            accessor: 'current_position',
            maxWidth: 50,
            style:{
              textAlign:"center"
            }
    
        },
            {
            Header: 'First Name',
            accessor: 'player_bio.short_name',
            maxWidth: 50,
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
            maxWidth: 50,
            style:{
              textAlign:"center"
            }
          },
          
        ]

        const fullColumns = [
      
    
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
          <div className="container">
            <h2>{this.props.golfScores.tour_name}</h2>
            <h3>{this.props.golfScores.tournament_name}</h3>
          
            <h4>Round{"  "}{this.props.golfScores.current_round}</h4>
            <h4>Status:{"  "}{this.props.golfScores.round_state}</h4>
            {courses}
            <Breakpoint m up>
            
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
              <Breakpoint m down>
              
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
      
      golfScores: state.golfHistoryScores,
      leaderboard: state.golfHistoryscores,
      players:state.playersHistory,
      tourSelected: state.selectedHistoryTour,
      uid:state.uid,
      courses:state.coursesHistory
     

      
    }
  }


  export default connect(mapStateToProps)(History)
import React, {Component} from 'react';
import { connect } from 'react-redux'



import ReactTable from "react-table";
import "react-table/react-table.css";

class Tabletest extends Component {
  
  render() {
    const data = this.props.players
    console.log(this.props.players)

    const columns = [
        {
        Header:'Position',
        accessor: 'current_position'

    },
        {
        Header: 'First Name',
        accessor: 'player_bio.first_name'
      },
      {
        Header: 'Last Name',
        accessor: 'player_bio.last_name'
      }]
  

    return (
          <div>
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize = {10}
                pageSizeOptions = {[10, 20, 30]}
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
     
      test:state.test

      
    }
  }
  

export default connect(mapStateToProps)(Tabletest);
import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { setAuthenticationHeader } from '../utils/authenticate'
import * as actionTypes from '../store/actions/actionTypes'

class Logout extends Component{

    componentDidMount(){
        localStorage.removeItem('jwtoken')
        localStorage.removeItem('uid')
        this.props.onLogout()
        this.props.history.push('/')
    }

    render(){
        return (
        <h1>goodbye</h1>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onLogout: () => dispatch({type: 'LOGOUT'})
    }
  }

export default connect(null,mapDispatchToProps)(Logout)
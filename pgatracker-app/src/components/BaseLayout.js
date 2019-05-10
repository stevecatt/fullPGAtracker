import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { Fragment } from 'react';
import Selector from './Selector'




class Menu extends Component {
    render(){
        return(
            <div>
              {!this.props.isAuth ?<NavLink className="font-weight-bold topbar" to="/login"> login </NavLink>:null}
              {!this.props.isAuth ?<NavLink className="font-weight-bold topbar" to="/register"> Register</NavLink>:null}
              {this.props.isAuth ?  <NavLink className="font-weight-bold topbar" to="/logout"> logout </NavLink>:null}
              {this.props.isAuth ?  <NavLink className="font-weight-bold topbar" to="/user-page"> User Page </NavLink>:null}
              
            </div>
        )
    }
}


class Footer extends Component {

    render() {
      return (
        <div className="footer">Copyright 2019</div>
      )
    }
  
  }
  
  class BaseLayout extends Component {
  
    render() {
      return (
        <div>
          <Menu isAuth = {this.props.isAuth}/>
            {this.props.children}
          <Footer/>
        </div>
      )
    }
  
  }

  const mapStateToProps =(state)=>{
    return{
      isAuth: state.isAuthenticated
    }
  }
  export default connect(mapStateToProps)(BaseLayout)
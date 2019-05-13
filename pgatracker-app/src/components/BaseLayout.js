import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { Fragment } from 'react';
import Selector from './Selector'




class Menu extends Component {
    render(){
        return(
            <div>
              <NavLink className="font-weight-bold topbar" to="/"> Home </NavLink>
              {!this.props.isAuth ?<NavLink className="font-weight-bold topbar" to="/login"> login </NavLink>:null}
              {!this.props.isAuth ?<NavLink className="font-weight-bold topbar" to="/register"> Register</NavLink>:null}
              {this.props.isAuth ?  <NavLink className="font-weight-bold topbar" to="/logout"> logout </NavLink>:null}
                <NavLink className="font-weight-bold topbar" to="/schedule"> schedule </NavLink>
                

              {this.props.isAuth ?  <NavLink className="font-weight-bold topbar" to="/userpage"> User Page </NavLink>:null}
              
              
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
    // think about this for later since we dont have the uid at the moment
    // componentDidMount(){
    //   let token = localStorage.getItem('jwtoken')
    //   this.props.onTokenRecieved(token)
    // }
  
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
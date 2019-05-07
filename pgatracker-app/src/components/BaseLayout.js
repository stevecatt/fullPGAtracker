import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { Fragment } from 'react';




class Menu extends Component {
    render(){
        return(
            <div></div>
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
          <Menu isAuth = {this.props.isAuth} isReq = {this.props.isReg}/>
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
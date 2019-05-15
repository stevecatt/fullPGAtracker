import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Fragment } from 'react';
import Selector from './Selector'
import * as actionTypes from '../store/actions/actionTypes'
import Breakpoint, { BreakpointProvider } from 'react-socks';
import { setDefaultBreakpoints } from 'react-socks';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Collapse, NavLink,Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

setDefaultBreakpoints([
  { xs: 0 },
  { s: 376 },
  { m: 426 },
  { l: 769 },
  { xl: 1025 }
]);




class Menu extends Component {
  constructor(){
    super()
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      collapsed: true
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }


    render(){
        return(
          <div className="container">
        <Navbar  light expand="md">
          <NavbarBrand><Link to="/"> Home</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem><NavLink className="font-weight-bold topbar"><Link to="/schedule"> Schedule</Link> </NavLink></NavItem>
              <NavItem>
              {this.props.isAuth ?  <NavLink className="font-weight-bold topbar"><Link to="/userpage"> Favorites </Link></NavLink>:null}
              </NavItem>
              <NavItem>
              {!this.props.isAuth ?<NavLink className="font-weight-bold topbar"><Link to="/login"> login</Link></NavLink>:null}
              </NavItem>
              <NavItem>
              {this.props.isAuth ?  <NavLink className="font-weight-bold topbar"><Link to="/logout"> logout </Link></NavLink>:null}
              </NavItem>
              <NavItem>
              {!this.props.isAuth ?<NavLink className="font-weight-bold topbar"><Link to="/register"> Register</Link></NavLink>:null}
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
            


class Footer extends Component {

    render() {
      return (
        <div className="footer container">Copyright 2019</div>
      )
    }
  
  }
  
  class BaseLayout extends Component {
    
    componentDidMount(){
      let token = localStorage.getItem('jwtoken')
      let uid = localStorage.getItem('uid')
      this.props.onTokenRecieved(token,uid)
    }
  
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

  const mapDispatchToProps = (dispatch)=>{
    return {
      onTokenRecieved: (token,uid)=> dispatch({type:actionTypes.IS_AUTHENITCATED, token: token,uid:uid})
    }
  }


  export default connect(mapStateToProps,mapDispatchToProps)(BaseLayout)
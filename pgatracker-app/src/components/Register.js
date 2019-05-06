import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

class Register extends Component {
    constructor(){
        super()
        this.state={
            firstName: "",
            lastName: "",
            userName: "",
            password: ""

        }



    }

    handleTextBoxChange = (e) => {

        this.setState({
          //note that this is an array in order to create the states
          [e.target.name]: e.target.value
        })
      
      }

      handleSaveUserClick = () => {
  
    
  
        axios.post('http://localhost:8080/register', {
     
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userName: this.state.userName,
          password: this.state.password
        })
    
      
      .then(response =>  {
          if(response.data.exists) {
            console.log("user exists")
            
            
          } else if (response.data.success){
            console.log(response.data.success)
           
            //this.props.history.push('/login')
            this.props.onResultTrue()
          }else{
              console.log("error")
          }
        })
      
      }

    render(){
        return(
            <div>
            <h1>Register</h1>
            <input type="text" onChange={this.handleTextBoxChange} placeholder="first name" name="firstName" />
            <input type="text" onChange={this.handleTextBoxChange} placeholder="last name" name="lastName" />
            <input type="text" onChange={this.handleTextBoxChange} placeholder="user name" name="userName" />
            <input type="password" onChange={this.handleTextBoxChange} placeholder="password" name="password" />
            <button onClick={this.handleSaveUserClick}>Register</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onResultTrue: ()=> dispatch({type:'IS_REGISTERED'})
  }
}

const mapStateToProps =(state)=>{
  return{
    isReg: state.isRegistered
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register) 
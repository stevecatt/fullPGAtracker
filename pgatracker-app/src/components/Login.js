import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { setAuthenticationHeader } from '../utils/authenticate'



class Login extends Component {
    constructor(){
        super()
        this.state={
            userName: "",
            password:""
           

        }

    }

    

    handleTextBoxChange = (e) => {

        this.setState({
          //note that this is an array in order to create the states
          [e.target.name]: e.target.value
        })
      
      }

      handleSaveUserClick = () => {
      axios.post('http://localhost:8080/login', {
       
          
           
            userName: this.state.userName,
            password: this.state.password
        
        })
        
        .then(response => {
          if (response.data != false){
          console.log(response)
          let token = response.data.token

          localStorage.setItem('jwtoken',token)
          this.props.history.push('/view-all-books')
          this.props.onTokenRecieved(token)
          setAuthenticationHeader(token)
          }else{console.log("you messed up")}
        })
        // .then(result => {
        //     if(result===true) {
            
        //       console.log("USER Autherized")
             
          
        //       this.props.history.push('/view-all-books')
        //       this.props.onResultTrue()
              
              
        //     } else{
        //       this.props.history.push('/')
        //     }
                
            
        //   })
        
        }
  

    render(){
        return(
            <div>
            <h1>Login</h1>
            <input type="text" onChange={this.handleTextBoxChange} placeholder="user name" name="userName" />
            <input type="password" onChange={this.handleTextBoxChange} placeholder="password" name="password" />
            <button onClick={this.handleSaveUserClick}>Login</button>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    onTokenRecieved: (token)=> dispatch({type:'IS_AUTHENTICATED'})
  }
}

const mapStateToProps =(state)=>{
  return{
    isAuth: state.isAuthenticated
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login) 
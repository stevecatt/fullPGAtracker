const express= require('express')
const bodyParser= require('body-parser')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const pgp = require('pg-promise')()
app.use(cors())

app.use(bodyParser.json())



 connectionString = {
    "host": "isilo.db.elephantsql.com",
    "port": 5432,
    "database": "wqvacxnt",
    "user": "wqvacxnt",
    "password":"bM2NzSbufCMxdKbPApBC81ccllnzndGm"
  
  }

db = pgp(connectionString)




let books = [
{name: 'Book 1'},
{name: 'Book 2'}
]

function authenticate(req,res, next) {

  let headers = req.headers["authorization"]
  
  let token = headers.split(' ')[1]

  jwt.verify(token,'secret',(err, decoded) => {
    if(decoded) {
      if(decoded.id) {
        next()
      } else {
        res.status(401).json({message: 'Token invalid'})
      }
    } else {
      res.status(401).json({message: 'Token invalid'})
    }
  })

}


app.get('/', (req, res) => {
    res.send('hello')
})



  //adding a new user 
  app.post('/register', (req,res) => {
    let userName = req.body.userName
    let firstName = req.body.firstName
    let lastName= req.body.lastName
    let hash = bcrypt.hashSync(req.body.password, saltRounds)
console.log(userName,firstName,lastName,hash)

    db.one('SELECT EXISTS(SELECT user_name FROM users WHERE user_name = $1)', [userName])
    .then((user) => {
      if (user.exists) {
        res.json({exists: true})
      } else {
        db.one('INSERT INTO users (first_name,last_name,user_name, hash) VALUES($1,$2,$3,$4) RETURNING id', [firstName, lastName,userName, hash])
        .then((added)=>{
          if(added){
            console.log(added)
            res.json({success: true})
          }
          else {
            res.json({success: false, message: 'Error adding user'})
          }
        
        })
        
      }
    })
  })
 // logging in new user

 app.post ('/login',(req,res) => {
  let userName = req.body.userName
  //console.log(userName)
  db.one('SELECT EXISTS(SELECT user_name FROM users WHERE user_name = $1)', [userName])
  .then((user) => {
    //console.log(user.exists)
    if (user.exists){
      //console.log("we got one")
      db.one('SELECT hash,id FROM users WHERE user_name=$1', [userName])
      .then((logger)=>{
        bcrypt.compare(req.body.password, logger.hash, function(err, result){
          if (result){
            jwt.sign({ id:logger.id}, 'secret', function(err, token) {
              console.log(token)

              if(token != false)  {
                res.json({token: token})
              } else {
                res.json({message: 'Unable to generate token'})
              }
      
          });
          }else{
            res.json(result)
            console.log("error coming back")
            console.log(result)
          }

        })
      })
    
      }
    
        
    
      else{
        console.log("error")
       }
    })
  
  })
  
        
     
  
    
  
  
app.listen(8080,()=>{
console.log("At your service")
})

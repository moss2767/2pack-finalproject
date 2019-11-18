import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Container, TextField, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useStyles } from './SignUpStyle'

const SignUp = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()
  let history = useHistory()
  
  const logIn = async (event) => {
    event.preventDefault()
    console.log(username)
    if(password !== "2pack") {
      return alert("Wrong password!")
    }
    const res = await fetch('http://localhost:8000/login')
    const data = await res.json()
    if(data.approved) {
      history.push('/quizzes')
    }
    else {
      alert("Wrong password!")
    }
  }

  return ( 
  <div>
    <NavBar />
    <Container maxWidth="sm">
        <form className={classes.container} noValidate autoComplete="off" onSubmit={logIn}>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Username"
            margin="normal"
            variant="outlined"
            onChange={(event) => setUsername(event.target.value)}
          />

          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Password"
            margin="normal"
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" variant="contained" className={classes.button}>
            Log In
          </Button>
        </form>
      </Container>
  </div>
  )
}
 
export default SignUp;
import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Container, TextField, Button, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const SignUp = () => {

  const classes = useStyles()
  let history = useHistory()
  
  const logIn = async () => {
    const res = await fetch('http://localhost:8000/login')
    const data = res.json()
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
          />

          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Password"
            margin="normal"
            variant="outlined"
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
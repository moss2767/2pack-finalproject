import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, TextField, Button, makeStyles } from '@material-ui/core'
import NavBar from '../../components/NavBar/NavBar'
import './Home.css'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

const Home = () => {
  let history = useHistory()
  const classes = useStyles()

  const play = (event) => {
    event.preventDefault()
    history.push('/play')
  }
  
  return (
    <div>
      <NavBar />
      <Container>
        <form className="form" noValidate autoComplete="off" onSubmit={play}>
          
          <TextField
            id="Name"
            className={classes.textField}
            label="Name"
            margin="normal"
            variant="outlined"/>

          <TextField
            id="Code"
            className={classes.textField}
            label="Code"
            margin="normal"
            variant="outlined"/>

          <Button type="submit" color="primary" variant="contained" className={classes.button}>
            Play!
          </Button>
        </form>

        <button onClick={() => history.push('/quizzes')}>
          Host a game?
        </button>

      </Container>  
    </div>
  )
}

export default Home;
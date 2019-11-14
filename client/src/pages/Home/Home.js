import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container, TextField, Button, makeStyles } from '@material-ui/core'
import NavBar from '../../components/NavBar/NavBar'
import './Home.css'
import { actionSetName } from '../../actions/actions'

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
  const dispatch = useDispatch()
  let history = useHistory()
  const classes = useStyles()
  const [name, setName] = useState('')

  const play = (event) => {
    dispatch(actionSetName(name))
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
            onChange={(event) => setName(event.target.value)}
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
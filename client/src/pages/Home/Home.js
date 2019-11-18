import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container, TextField, Button, makeStyles } from '@material-ui/core'
import NavBar from '../../components/NavBar/NavBar'
import './Home.css'
import { setName as setNameAction, joinGame, newUser } from '../../actions/actions'

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
  const [code, setCode] = useState('')

  const play = async (event) => {
    event.preventDefault()
    const res = await fetch('http://localhost:8000/list-of-rooms')
    const data = await res.json()
    if(data.rooms.includes(code)) {
      dispatch(joinGame({name, code}))
      // dispatch(setNameAction(name))
      // dispatch(joinGame(code))
      // dispatch(newUser({
      //   name: name
      // }))
      history.push('/player')
    } else {
      alert("Room doesn't exist!")
    }
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
            required
            onChange={(event) => setName(event.target.value)}
            variant="outlined"/>

          <TextField
            id="Code"
            className={classes.textField}
            label="Code"
            margin="normal"
            required
            onChange={(event) => setCode(event.target.value)}
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
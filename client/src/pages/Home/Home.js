import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, TextField, Button, makeStyles } from '@material-ui/core'
import NavBar from '../../components/NavBar/NavBar'

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
      <Container maxWidth="sm">
        <form className={classes.container} noValidate autoComplete="off" onSubmit={play}>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Name"
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Code"
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" className={classes.button}>
            Play!
          </Button>
        </form>
        <button onClick={() => history.push('/create-game')}>Host a game?</button>
      </Container>  
    </div>
  );
}




export default Home;
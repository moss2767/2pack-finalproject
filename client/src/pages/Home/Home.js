import React from 'react'
import { useHistory } from 'react-router-dom'
import { AppBar, Container, TextField, Toolbar, Typography, Button, IconButton, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
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
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
             {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            2Pack Quiz 
          </Typography>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
    </AppBar>
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
    </Container>
  

  
  </div>
  );
}




export default Home;
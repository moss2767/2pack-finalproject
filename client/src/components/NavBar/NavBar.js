import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

const NavBar = () => {
  const classes = useStyles()

  return (
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
  )
}

export default NavBar
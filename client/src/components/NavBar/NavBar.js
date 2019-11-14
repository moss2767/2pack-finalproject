import React, { useState } from 'react';
import { AppBar, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, IconButton, Button, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import InfoIcon from '@material-ui/icons/Info'
import GamesIcon from '@material-ui/icons/Games'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'

const useStyles = makeStyles(() => ({
  menuButton: {
    marginRight: 2,
  },
  title: {
    '&:hover': {
      cursor: 'pointer',
    }
  },
  rightSide: {
    marginLeft: "auto",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const NavBar = () => {
  const classes = useStyles()
  let history = useHistory()

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >

      <List>
        
        <ListItem button onClick={() => history.push('/quizzes')}>
          <ListItemIcon>
            <GamesIcon />
          </ListItemIcon>
          <ListItemText primary='Quizzes' />
        </ListItem>

        <ListItem button onClick={() => history.push('/leaderboard')}>
          <ListItemIcon>
            <FormatListNumberedIcon />
          </ListItemIcon>
          <ListItemText primary='Leaderboard' />
        </ListItem>

      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push('/about')}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary='About' />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography onClick={() => history.push('/')} variant="h6" className={classes.title}>
          2Pack Quiz
        </Typography>
        <Button className={classes.rightSide} onClick={() => history.push('/signup')} color="inherit">Sign Up</Button>
      </Toolbar>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </AppBar>
  )
}

export default NavBar
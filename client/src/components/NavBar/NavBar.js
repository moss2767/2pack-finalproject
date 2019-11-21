import React, { useState } from 'react'
import { AppBar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import GamesIcon from '@material-ui/icons/Games'
import InfoIcon from '@material-ui/icons/Info'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from './Style'

const NavBar = () => {
  const classes = useStyles()
  let history = useHistory()
  const [drawer, setDrawer] = useState(false)

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawer(open)
  }

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button onClick={() => history.push('/quizzes')}>
          <ListItemIcon>
            <GamesIcon />
          </ListItemIcon>
          <ListItemText primary='Quizzes' />
        </ListItem>
        <ListItem button onClick={() => history.push('/leaderboards')}>
          <ListItemIcon>
            <FormatListNumberedIcon />
          </ListItemIcon>
          <ListItemText primary='Leaderboards' />
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
        <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography onClick={() => history.push('/')} variant="h6" className={classes.title}>
          2Pack Quiz
        </Typography>
        <Button className={classes.rightSide} onClick={() => history.push('/signup')} color="inherit">Sign Up</Button>
      </Toolbar>
      <Drawer open={drawer} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </AppBar>
  )
}

export default NavBar
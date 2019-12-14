import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth0 } from '../../react-auth0-spa'

import { AppBar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import GamesIcon from '@material-ui/icons/Games'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from './Style'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
  const [isAdmin, setIsAdmin] = useState(false)
  const classes = useStyles()
  const history = useHistory()
  const [drawer, setDrawer] = useState(false)
  useEffect(() => {
    if (isAuthenticated) {
      if (user['https://salt-quiz'] === 'admin') {
        setIsAdmin(true)
      }
    }
    // eslint-disable-next-line
  }, [user])

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
        <ListItem button onClick={() => history.push('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
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
        {isAuthenticated && (<ListItem button onClick={() => history.push('/profile')}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItem>)}
        {isAuthenticated && isAdmin && (<ListItem button onClick={() => history.push('/admin')}>
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText primary='Admin / Add Quiz' />
        </ListItem>)}
        <ListItem button onClick={() => history.push('/about')}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary='About' />
        </ListItem>
      </List>
    </div>
  )

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography onClick={() => history.push('/')} variant="h6" className={classes.title}>
          2Pack Quiz
        </Typography>

        {!isAuthenticated && (
          <Button className={classes.rightSide} color="inherit" onClick={() => loginWithRedirect({})}>Log in</Button>
        )}
        {isAuthenticated && (
          <Button className={classes.rightSide} color="inherit" onClick={() => logout()}>Log out</Button>
        )}
      </Toolbar>
      <Drawer open={drawer} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </AppBar>
  )
}

export default NavBar

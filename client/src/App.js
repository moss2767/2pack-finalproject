import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './pages/About/About'
import GameHost from './pages/GameHost/GameHost'
import GamePlayer from './pages/GamePlayer/GamePlayer'
import Home from './pages/Home/Home'
import TestAPI from './pages/TestAPI'
import HostResult from './pages/Result/Host/Host'
import PlayerResult from './pages/Result/Player/Player'
import Leaderboards from './pages/Leaderboards/Leaderboards'
import MiniGame from './pages/MiniGame/MiniGame'
import Profile from './pages/Profile/Profile'
import Quizzes from './pages/Quizzes/Quizzes'

const App = () => {
  return (
    <Router>
      <Switch>

        <Route path="/quizzes">
          <Quizzes/>
        </Route>

        <Route path="/play">
          <GameHost/>
        </Route>

        <Route path="/player">
          <GamePlayer/>
        </Route>

        <Route path="/leaderboards">
          <Leaderboards/>
        </Route>

        <Route path="/about">
          <About/>
        </Route>

        <Route path="/result">
          <HostResult/>
        </Route>

        <Route path="/result-player">
          <PlayerResult/>
        </Route>

        <Route path="/mini-game">
          <MiniGame/>
        </Route>

        <Route path="/profile">
          <Profile/>
        </Route>

        <Route path="/external-api">
          <TestAPI />
        </Route>

        <Route path="/">
          <Home/>
        </Route>

      </Switch>
    </Router>

  )
}

export default App

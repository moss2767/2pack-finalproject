import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import GameHost from './pages/GameHost/GameHost'
import GamePlayer from './pages/GamePlayer/GamePlayer'
import Quizzes from './pages/Quizzes/Quizzes'
import Leaderboards from './pages/Leaderboards/Leaderboards'
import SignUp from './pages/SignUp/SignUp'
import About from './pages/About/About'
import HostResult from './pages/Result/Host/Host'
import PlayerResult from './pages/Result/Player'
import MiniGame from './pages/MiniGame/MiniGame'

const App = () => {
 
  return (

    <Router>
      <Switch>

        <Route path="/quizzes">
          <Quizzes/>
        </Route>

        <Route path="/signup">
          <SignUp/>
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

        <Route path="/">
          <Home/>
        </Route>

      </Switch>
    </Router>

  )
}

export default App

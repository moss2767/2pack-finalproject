import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'
import CreateGame from './pages/CreateGame/CreateGame'
import Leaderboard from './pages/Leaderboard/Leaderboard'

function App() {
 
  return (

    <Router>
      <Switch>

        <Route path="/create-game">
          <CreateGame/>
        </Route>

        <Route path="/play">
          <Game/>
        </Route>

        <Route path="/leaderboard">
          <Leaderboard/>
        </Route>

        <Route path="/">
          <Home/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;

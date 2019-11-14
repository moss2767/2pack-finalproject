import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'
import Quizzes from './pages/Quizzes/Quizzes'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import SignUp from './pages/SignUp/SignUp'

function App() {
 
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

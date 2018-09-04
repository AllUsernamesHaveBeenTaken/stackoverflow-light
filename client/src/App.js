/* eslint-disable */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';
import { QuestionList } from './components/Question';
import Navigation from './components/Navigation';
import { Login, Signup } from './components/Authentication';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={QuestionList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default App;

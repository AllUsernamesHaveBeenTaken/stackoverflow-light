/* eslint-disable */

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { QuestionList, AskQuestion, QuestionDetail } from './components/Question';
import Navigation from './components/Navigation';
import { Login, Signup } from './components/Authentication';

import { FilterProvider } from './Contexts';

const withFilterConsumer = child => <FilterConsumer>{context => <child />}</FilterConsumer>;

class App extends Component {
  render() {
    return (
      <div>
        <FilterProvider>
          <Navigation />
          <Switch>
            <Route exact path="/" component={QuestionList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/askquestion" component={AskQuestion} />
            <Route path="/question/:id" component={QuestionDetail} />
            <Redirect to="/" />
          </Switch>
        </FilterProvider>
      </div>
    );
  }
}

export default App;

import React from 'react';
import Navbar from './pages/Navbar';
import Both from './pages/both';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Single from './pages/single';
import About from './pages/about';
import Project from './pages/project'



function App() {

  return (
    <>
      <Router>
                <Navbar />
                <Switch>
                    <Route exact path = "/">
                      <Both />
                    </Route>
                    <Route path = "/home/:id" >
                      <Single />
                    </Route>
                    <Route path = "/about">
                      <About />
                    </Route>
                    <Route exact path = "/basket">
                      <Project />
                    </Route>
                </Switch>
      </Router>
    </>
  );
}

export default App;

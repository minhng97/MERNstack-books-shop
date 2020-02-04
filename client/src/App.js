import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'
import BlogPost from './pages/blogPost'
import TopMenu from './pages/topMenu'
import Register from './pages/register'
import './App.css'
// import { TabPane } from 'reactstrap';

class App extends Component {


  render() {
    //JSX
    return (
      <Router>
      <div className="app">
        <TopMenu />
      <Switch>
        <Route path="/" exact component={BlogPost} />
        <Route path="/reg" exact component={Register} />
        <Route component={() => <h2 className="mt-3 text-center">404 Not Found</h2>}/>
      </Switch>
      </div>
      </Router>
    )
  }

}

export default App;

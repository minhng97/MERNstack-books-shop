import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { connect } from 'react-redux'


import BlogPost from './pages/blogs/blogPost'
import TopMenu from './pages/topMenu'
import Register from './pages/register'
import Login from './pages/login'
import AllBooks from './pages/books/books.all'
import BookCart from './pages/books/cart.book'
import './App.css'


class App extends Component {

  render() {
    document.title = "React shopping page";
let userIsAuth = JSON.stringify(this.props.userAuth)
    return (
      < Router >
     

        <div className="app">   props: {userIsAuth && userIsAuth}
          <TopMenu />
          <Switch>
            <Route path="/" exact component={BlogPost} />
            <Route path="/reg" exact component={Register} />
            <Route path="/log" exact component={Login} />
            <Route path="/books" exact component={AllBooks} />
            <Route path="/bookCart" exact component={BookCart} />
            <Route component={() => <h2 className="mt-3 text-center">404 Not Found</h2>} />
          </Switch>

        </div>
      </Router >
    )
  }

}


const mapStateToProps = (state) => {
  return {
    userAuth: state.userAuth
  }
}

export default connect(mapStateToProps)(App)


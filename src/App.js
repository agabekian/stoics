import React, { Component } from "react";
import "./App.css";
import { Router } from '@reach/router';
import { withAuth0 } from '@auth0/auth0-react';
import Login from './components/auth/Login';
import Note from "./components/Note";
import QList from "./components/QList";
import Favs from "./components/Favs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false }
  }

  togglePop = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      this.props.auth0.isAuthenticated ?
        <>
          <Router className="App">
            <QList path="/" togglePop={this.togglePop} modal={this.state.modal} />
            <Note path="/note/:id/" togglePop={this.togglePop} modal={this.state.modal} />
            <Favs path="/favs" />
          </Router>
        </>
        :
        <Login />
    );
  }
}

export default withAuth0(App);

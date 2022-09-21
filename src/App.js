import React, { Component } from "react";
import "./App.css";
import { Router } from '@reach/router';


import Note from "./components/Note";
import QList from "./components/QList";
import Favs from "./components/Favs";
import NavBar from './components/NavBar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, loading: false, about: false }
  }

  togglePop = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  }

  toggleAbout = () => {
    this.setState({ about: !this.state.about })
  }

  render() {
    return (
      <div>
        <NavBar toggleAbout={this.toggleAbout} togglePop={this.togglePop} about={this.state.about} />
        <Router className="App">
          <QList path="/" togglePop={this.togglePop} modal={this.state.modal} toggleLoading={this.toggleLoading} loading={this.state.loading} />
          <Note path="/note/:id/" togglePop={this.togglePop} modal={this.state.modal} />
          <Favs path="/favs" toggleLoading={this.toggleLoading} loading={this.state.loading} />
        </Router>
      </div>
      // this.props.auth0.isAuthenticated ?
      // :

    );
  }
}

export default App;

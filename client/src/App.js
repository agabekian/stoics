import React, { Component } from "react";
import "./App.css";
import JokeList from "./components/JokeList";
import { Router } from '@reach/router';
import Note from './components/Note';
import Favs from "./components/Favs";
import About from "./components/About";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, num_of_comments: 0 }
    this.togglePop = this.togglePop.bind(this);
  }

  togglePop() {
    this.setState({
      modal: !this.state.modal
    });
    console.log("state flip")
  }


  render() {
    return (
      <Router className="App">
        <JokeList path="/" togglePop={this.togglePop} modal={this.state.modal} />
        <Note path="/note/:id/" togglePop={this.togglePop} modal={this.state.modal} />
        <Favs path="/favs" noc={this.state.num_of_comments}/>
        <About path="/about" />
      </Router>
    );
  }
}

export default App;

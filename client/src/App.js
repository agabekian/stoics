import React, { Component } from "react";
import "./App.css";
import JokeList from "./components/JokeList";
import { Router } from '@reach/router';
import Note from './components/Note';
import Favs from "./components/Favs";
import About from "./components/About";



class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Router className="App">
          <JokeList  path="/"/>
          <Note path = "/note/:id/"/>
          <Favs path = "/favs" />
          <About path="/about"/>
      </Router>
    );
  }
}

export default App;

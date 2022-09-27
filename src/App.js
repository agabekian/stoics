import React, { Component } from "react";
import "./App.css";
import Profile from "./components/auth/Profile";
import QList from "./components/QList";
import Favs from "./components/Favs";
import NavBar from './components/NavBar';
import { Route, Routes } from "react-router-dom";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
      about: false,
      favs: [],
    }
  }

  getSavedQuotes = async () => {
    try {
      console.log("preloading the quotes");
      let savedQuotes = await axios.get(`${process.env.REACT_APP_SERVER}/api/entries`);
      this.setState({ favs: savedQuotes.data });
    } catch (error) {
      console.log('we have an error: ', error.response);
    }
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

  updateFavsState = (fFavs) => { this.setState({ favs: fFavs }) }

  componentDidMount() {
    this.getSavedQuotes();
  }


  render() {
    return (
      <>
        <NavBar
          toggleAbout={this.toggleAbout}
          togglePop={this.togglePop}
          about={this.state.about}
        />

        <Routes>
          <Route path="/favs" element={
            <Favs
              toggleLoading={this.toggleLoading}
              loading={this.state.loading}
              favs={this.state.favs}
              
              updateFavsState={this.updateFavsState}
            />}
          />

          <Route path="/notes/:id" element={
            <Profile
              togglePop={this.togglePop}
              modal={this.state.modal}
            />
          } />
          <Route path="/" element={
            <div className='App'>
              <QList
                togglePop={this.togglePop}
                modal={this.state.modal}
                toggleLoading={this.toggleLoading}
                loading={this.state.loading}
                getFavs={this.getSavedQuotes}
              />
            </div>} />
          {/* <QList path="/" togglePop={this.togglePop} modal={this.state.modal} toggleLoading={this.toggleLoading} loading={this.state.loading} />
          <Favs path="/favs" toggleLoading={this.toggleLoading} loading={this.state.loading} /> */}
        </Routes>

      </>
      // this.props.auth0.isAuthenticated ?
      // :

    );
  }
}

export default App;

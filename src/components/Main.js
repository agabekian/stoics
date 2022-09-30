import React, { Component } from "react";
import Profile from "./auth/Profile";
import QList from "./QList";
// import "./Main.css";
import Enter from "./Enter";

import Favs from "./Favs";
import NavBar from './NavBar';
import { Route, Routes, Outlet, Link } from "react-router-dom";
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
      about: false,
      favs: [],
      change: false
    }
  }

  // getSavedQuotes = async () => {
  //   try {
  //     console.log("preloading the quotes");
  //     let savedQuotes = await axios.get(`${process.env.REACT_APP_SERVER}/api/entries`);
  //     this.setState({ favs: savedQuotes.data });
  //   } catch (error) {
  //     console.log('we have an error: ', error.response);
  //   }
  // }

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

  // updateFavsState = (fFavs) => {
  //   console.log("im updating func");
  //   this.setState({change:true})
  //   this.setState({ favs: [...this.state.favs,fFavs] }) 
  // }

  // componentDidMount() {
  //   this.getSavedQuotes();
  // }

  render() {
    return (
      <>
        <NavBar
          toggleAbout={this.toggleAbout}
          togglePop={this.togglePop}
          about={this.state.about}
        />

        <Routes>
          <Route path="/" element={
            <Link to='/home'>
              <Enter />
            </Link>
          } />

          <Route path="/notes/:id" element={
            <Profile
              togglePop={this.togglePop}
              modal={this.state.modal}
            />
          } />

          <Route path="/home" element={
            <div className='App'>
              <QList
                togglePop={this.togglePop}
                modal={this.state.modal}
                toggleLoading={this.toggleLoading}
                loading={this.state.loading}
                getFavs={this.getSavedQuotes}
                updateFavsState={this.updateFavsState}
                toggleChange={this.state.toggleChange}
                favs={this.state.favs}
              />
              <Outlet />
            </div>
          } />

          <Route path="/favs" element={
            <Favs
              toggleLoading={this.toggleLoading}
              getSavedQuotes={this.getSavedQuotes}
              loading={this.state.loading}
              favs={this.state.favs}
              modal={this.state.modal}
              toggleChange={this.state.toggleChange}
              updateFavsState={this.updateFavsState} //update on delete in favs
            />}
          />

          {/* <QList path="/" togglePop={this.togglePop} modal={this.state.modal} toggleLoading={this.toggleLoading} loading={this.state.loading} />
          <Favs path="/favs" toggleLoading={this.toggleLoading} loading={this.state.loading} /> */}
        </Routes>

      </>
      // this.props.auth0.isAuthenticated ?
      // :

    );
  }
}

export default Main;

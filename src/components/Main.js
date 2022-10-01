import React, { Component } from "react";
import Profile from "./auth/Profile";
import QList from "./QList";
import "./Main.css";
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

//   componentWillMount(){
//     document.body.style.overflow = "hidden";
// }
//   componentWillUnmount(){
//     document.body.style.overflow = "auto";
// }
  render() {
    return (
      <div>
        <div style={{position:'fixed',top:'0px',width:'100%',margin:'0px auto'}}>
          <NavBar
            toggleAbout={this.toggleAbout}
            togglePop={this.togglePop}
            about={this.state.about}
          />
        </div>


        <Routes>
          <Route path="/" element={
            <Link to='/home'>
              <Enter />
              <h1 className="tag">STOIC COMPANION</h1>

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

      </div>
      // this.props.auth0.isAuthenticated ?
      // :

    );
  }
}

export default Main;
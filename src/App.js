import React, { Component } from "react";
import "./App.css";
import Profile from "./components/auth/Profile";
import QList from "./components/QList";
import Favs from "./components/Favs";
import NavBar from './components/NavBar';
import { Route, Routes } from "react-router-dom";


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
      <>
        <NavBar
          toggleAbout={this.toggleAbout}
          togglePop={this.togglePop}
          about={this.state.about}
        />
          <Routes>
            {/* <Route path="/" element= {<Home/>} /> */}
            <Route path="/favs" element={<Favs toggleLoading={this.toggleLoading} loading={this.state.loading} />} />
            <Route path="/notes/:id" element={
              <Profile togglePop={this.togglePop} modal={this.state.modal} />
            } />
            <Route path="/" element={
              <div className='App'>
                <QList
                  togglePop={this.togglePop}
                  modal={this.state.modal}
                  toggleLoading={this.toggleLoading}
                  loading={this.state.loading}
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

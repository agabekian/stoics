import React, { useState, useEffect, Context } from 'react';
import Profile from "./auth/Profile";
import QList from "./QList";
import Enter from "./Enter";
import Favs from "./Favs";
import NavBar from './NavBar';
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Route, Routes, Outlet, Link } from "react-router-dom";
import axios from 'axios';

const Main = (props) => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState(false);
  const [favs, setFavs] = useState([]);
  const [reloadStored, setReloadStored] = useState(false);
  
  useEffect(() => {
    // toggleLoading();

    const getSavedQuotes = async () => {
      let savedQuotes = await axios.get(`${process.env.REACT_APP_SERVER}/api/entries`);
      setFavs((savedQuotes.data),
        window.localStorage.setItem("fQuotes", JSON.stringify(favs))
      );
      // alert("done")
      // setLoading(false)
      setReloadStored(false)
    }

    const result = getSavedQuotes().catch(console.error);
  }, [reloadStored]
  )

  const togglePop = () => setModal(!modal);
  const toggleLoading = () => setLoading(!loading);
  const toggleAbout = () => setAbout(!about);
  const triggerReload = () => setReloadStored(true)


  const nav = <div style={{ position: 'fixed', width: '100%', margin: '0px auto' }}>
    <NavBar
      toggleAbout={toggleAbout}
      togglePop={togglePop}
      about={about}
    />
  </div>

  return (
    <>
      <Routes>
        <Route path="" element={
          <Link to='/home'>
            <Enter />
          </Link>
        } />

        <Route path="/notes/:id" element={
          <ProtectedRoute togglePop={togglePop}>
            {nav}
            <Profile
              togglePop={togglePop}
              modal={modal}
            />
          </ProtectedRoute>
        } />

        <Route path="/home" element={
          <div className='App'>
            {nav}
            <QList
              togglePop={togglePop}
              modal={modal}
              toggleLoading={toggleLoading}
              loading={loading}
              triggerReload={triggerReload}

            />
            {/* <Outlet /> */}
          </div>
        } />

        <Route path="/favs" element={
          <>
            {nav}
            <Favs
              toggleLoading={toggleLoading}
              // getSavedQuotes={getSavedQuotes}
              loading={loading}
              storedTopics={favs}
              modal={modal}
            // updateFavsState={updateFavsState} //update on delete in favs
            />
          </>
        }
        />
      </Routes>
      <h1 className="tag">STOIC COMPANION</h1>
    </>
    // this.props.auth0.isAuthenticated ?
    // :
  );
}


export default Main;

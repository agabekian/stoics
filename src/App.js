import React, { Component } from "react";
// import "./components/Main.css";
// import { Route, Routes, Link, Outlet } from "react-router-dom";
import axios from 'axios';
import Main from "./components/Main";
import QList from "./components/QList";
import { Route, Routes, Link } from "react-router-dom";

class App extends Component {
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

    togglePop = () => {
        this.setState({
            change: !this.state.change
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

                {/* <Route path="/home" element={
                        <div>
                            <Main
                            // togglePop={this.togglePop}
                            // modal={this.state.modal}
                            // toggleLoading={this.toggleLoading}
                            // loading={this.state.loading}
                            // getFavs={this.getSavedQuotes}
                            // toggleChange={this.state.toggleChange}
                            />
                            {/* <Outlet /> */}
                {/* </div>}
                    /> */}

                {/* <Route path="/home/list" element={
                        <div className='App'>
                            <QList
                                togglePop={this.togglePop}
                                modal={this.state.modal}
                                toggleLoading={this.toggleLoading}
                                loading={this.state.loading}
                                getFavs={this.getSavedQuotes}
                                toggleChange={this.state.toggleChange}
                            />
                        </div>} /> */}
            </>

        );
    }
}

export default App;

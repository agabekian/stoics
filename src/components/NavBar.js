import React, { Component } from "react";
import Profile from './auth/Profile';
import { withAuth0 } from '@auth0/auth0-react';
import PopUp from './PopUp';
import About from './About';
import SavedQuote from "./SavedQuote";
import Links from './Links';
import { Route, Routes } from "react-router-dom";
import './NavBar.css'

class NavBarCompact extends Component {
    constructor(props) {
        super(props);
        this.state = { links: false }
    }

    toggleLink = () => {
        this.setState({ links: !this.state.links })
    }

    render() {
        let color1 = "#8a0303";
        return (
            <>
                {this.props.about ? <PopUp message={<About />} toggleAbout={this.props.toggleAbout} bColor={color1} fontColor='white' /> : ""}
                <nav class="topnav">
                    <div className="active">
                        <div className="active" onClick={this.props.toggleAbout}>
                            <Profile />
                        </div>
                        <i className="fas fa-archway home " ></i>
                        <i className="fas fa-angle-left arrow"></i>
                        <a href='/favs'><i className="fas fa-scroll fa-2x"></i></a>
                    </div>
                </nav>

                <a href="javascript:void(0);" class="icon" onClick={this.toggleLink}>
                    <i class="fa fa-bars"></i>
                </a>
                <Routes>
                    <Route path="/favs" element={<SavedQuote/>}/>
                    {this.state.links ? <Links toggleAbout={this.props.toggleAbout} /> : ""}
                </Routes>

            </>
        );
    }
}

export default withAuth0(NavBarCompact);
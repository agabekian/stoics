import React, { Component } from "react";
import { Link } from '@reach/router';

import Profile from './auth/Profile';
import { withAuth0 } from '@auth0/auth0-react';
import PopUp from './PopUp';
import About from './About';
import Links from "./Links";
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
                <div class="topnav">
                    <div className="active">
                        <div className="active" onClick={this.props.toggleAbout}>
                            <Profile />
                        </div>
                        <Link to="/favs/"><i className="fas fa-scroll fa-2x"></i></Link>
                    </div>


                    {this.state.links ? <Links toggleAbout={this.props.toggleAbout} /> : ""}

                    <a href="javascript:void(0);" class="icon" onClick={this.toggleLink}>
                        <i class="fa fa-bars"></i>
                    </a>
                </div>
            </>
        );
    }
}
export default withAuth0(NavBarCompact);
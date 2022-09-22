import React, { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';
import Logout from './auth/Logout'
import Login from './auth/Login';
import Profile from './auth/Profile';

class Links extends Component {

    render() {
        return (
            <div id="myLinks">
                <div className='menu-line' onClick={this.props.toggleAbout}>
                    <a>
                        About
                    </a>
                    {this.props.about ? <PopUp message={<About />} togglePop={this.props.toggleAbout} bColor={"red"} fontColor='white' /> : ""}
                </div>

                <div className='menu-line'>
                    {this.props.auth0.isAuthenticated ? <Logout /> : <Login />}
                </div>
                <div className='menu-line'>
                    <Profile />

                </div>

            </div>

        );
    }
}

export default withAuth0(Links);
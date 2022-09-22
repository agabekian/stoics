import React, { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';
import Logout from './auth/Logout'
import Login from './auth/Login';

class Links extends Component {

    render() {
        return (
            <div id="myLinks">
                <div onClick={this.props.toggleAbout}>
                    <a>
                        About
                    </a>
                    {this.props.about ? <PopUp message={<About />} togglePop={this.props.toggleAbout} bColor={"red"} fontColor='white' /> : ""}
                </div>

                {this.props.auth0.isAuthenticated ? <Logout /> : <Login />}
            </div>

        );
    }
}

export default withAuth0(Links);
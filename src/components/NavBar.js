import React, { Component } from "react";
import { Link } from '@reach/router';
import Logout from './auth/Logout'
import Login from './auth/Login';
import Profile from './auth/Profile';
import { withAuth0 } from '@auth0/auth0-react';
import PopUp from './PopUp';
import About from './About';

class NavBarCompact extends Component {
    state = {};
    
    render() {
        let color1 = "#8a0303";
        return (
            
            <div style={{display:'flex', justifyContent:'space-around',border:'3px solid grey',fontFamily:"Cinzel",backgroundColor:'white'}}>
                <Link to="/favs/" style={{ color: color1, margin: "10px" }}><i className="fas fa-scroll fa-2x"></i></Link>
                {this.props.auth0.isAuthenticated ?<Logout/>:<Login/>}
                <div onClick={this.props.toggleAbout} >stoic companion
                {this.props.about ? <PopUp message={<About />} togglePop={this.toggleAbout} bColor={color1} fontColor='white' /> : ""}

                <Profile />
          </div>
                
            </div>
        );
    }
}
export default withAuth0(NavBarCompact);
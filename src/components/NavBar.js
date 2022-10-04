import React, { useState } from "react";
import Profile from './auth/Profile';
import PopUp from './PopUp';
import About from './About';
import Links from './Links';
import { Link, useNavigate, Outlet } from "react-router-dom";
import './NavBar.css'

export default function NavBarCompact(props) {

    const [links, setLinks] = useState(false)
    const navigate = useNavigate();
    const color1 = "#8a0303";

    return (
        <div>
            <nav className="topnav">
                <div className="active">
                    <Link to='/favs'> <i className="fas fa-scroll"></i></Link>
                    <Link to=''> <i className="fas fa-angle-left" onClick={() => navigate(-1)}></i></Link>
                    <Link to=''> <i className="fas fa-angle-right" onClick={() => navigate(+1)}></i></Link>
                    <Link to='/home'> <i className="fas fa-archway" ></i></Link>
                    <p className="QList-title">stoic companion</p>

                    {/* <div className="appname" onClick={props.toggleAbout}>
                        <Profile />
                    </div> */}
                </div>
                <Link className="icon" onClick={() => setLinks(!links)}>
                    <i className="fa fa-bars"></i>
                </Link>

                {links ? <div><Links toggleAbout={props.toggleAbout} /></div> : ""}

            </nav>
            {props.about ? <PopUp message={<About />} toggleAbout={props.toggleAbout} bColor={color1} fontColor='white' /> : ""}


            {/* displays extras 'About', etc on click */}

        </div>
    );
}



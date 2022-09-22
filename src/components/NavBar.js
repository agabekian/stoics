import React, { useState } from "react";
import Profile from './auth/Profile';
import PopUp from './PopUp';
import About from './About';
import SavedQuote from "./SavedQuote";
import Links from './Links';
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css'

export default function NavBarCompact(props) {

    const [links, setLinks] = useState({ links: false })
    const navigate = useNavigate();
    const color1 = "#8a0303";

    return (
        <>
            <nav className="topnav">
                <div className="active">
                    <Link to='/favs'> <i className="fas fa-scroll navico "></i></Link>
                    <Link to=''> <i className="fas fa-angle-left navico" onClick={() => navigate(-1)}></i></Link>
                    <div className="appname" onClick={props.toggleAbout}>
                        <Profile />
                    </div>
                    <Link to='/'> <i className="fas fa-archway navico" ></i></Link>
                </div>
                <a href="javascript:void(0);" class="icon" onClick={() => setLinks(!links)}>
                    <i class="fa fa-bars"></i>
                </a>
                <div className='topnav'>
                    {!links ? <Links toggleAbout={props.toggleAbout} /> : ""}
                </div>
            </nav>
                    {props.about ? <PopUp message={<About />} toggleAbout={props.toggleAbout} bColor={color1} fontColor='white' /> : ""}


            {/* displays extras 'About', etc on click */}

        </>
    );
}



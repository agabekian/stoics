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
            {props.about ? <PopUp message={<About />} toggleAbout={props.toggleAbout} bColor={color1} fontColor='white' /> : ""}
            <nav className="topnav">
                <div className="active">
                    <div  onClick={props.toggleAbout}>
                        <Profile />
                    </div>
                    <Link to='/favs'> <i className="fas fa-scroll "></i></Link>
                    <Link to=''> <i className="fas fa-angle-left arrow" onClick={() => navigate(-1)}></i></Link>
                    <Link to='/'> <i className="fas fa-archway home " ></i></Link>
                </div>
                <a href="javascript:void(0);" class="icon" onClick={() => setLinks(!links)}>
                    <i class="fa fa-bars"></i>
                </a>
            </nav>

            {!links ? <Links toggleAbout={props.toggleAbout} /> : ""} 
            {/* displays extras 'About', etc on click */}

        </>
    );
}



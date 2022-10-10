import React, { useEffect, useState } from "react";
import NavBar from './NavBar';
import axios from 'axios';

const Enter = () => {
    const [one, setOne] = useState();
    const [author, setAuthor] = useState();

    useEffect(() => {
        const getRandomOne = async () => {
            // const qotd = JSON.parse(window.localStorage.getItem("fQuotes"));
            const qotd = JSON.parse(window.localStorage.getItem("quotes"));
            // console.log(qotd.data.content["0"].text, "one");
            // setOne(qotd.data["0"].content["0"].text)
            // console.log(qotd.length);
            // const pick = (Math.floor(Math.random() * qotd.length)).toString();
            // setOne(qotd[pick])
            let res = await axios.get("https://stoic-server.herokuapp.com/random");
            console.log(res.data["0"].body);
            setOne(res.data["0"].body)
            setAuthor(res.data["0"].author)
        }
        getRandomOne();
    }, [])

    return (
        <>
            <img style={{ opacity: "0.7" }} src={require('../images/logoA.png')}></img>
            {/* <p>stoic dude in marble</p> */}
            <h1 style={{ fontFamily: "cinzel", fontSize:"1.6em", textDecoration: "none", color: "grey" }}>{one}</h1>
            <p style={{ fontFamily: "cinzel", textDecoration: "none", color: "black" }}>{author}</p>
        </>

    );
}

export default Enter;
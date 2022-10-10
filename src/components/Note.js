import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import PopUp from './PopUp';
import "./Note.css";
import { v4 as uuidv4 } from 'uuid';

export default (props) => {
    let { id } = useParams();
    const { modal, togglePop } = props;
    const [title, setTitle] = useState(props.user);
    const [comments, setComments] = useState([{}]);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const displayEntry = () => {
        axios.get(process.env.REACT_APP_SERVER + "/api/entries/" + id)
            .then(res => setComments(res.data.comments))
            .catch(err => console.log("bummer, error:", err))
    }

    useEffect
        (
            () => { displayEntry() }, []
        );

    const SubmitHandler = e => {
        e.preventDefault();
        if (title.length < 3) {
            setError("title needs 3+ chars")
            togglePop();
        }
        else if (comment.length < 3) {
            setError("comment 3+ chars")
            togglePop();
        }
        else {
            let secKey = crazy();
            setComments([...comments, { text: comment, author: title, secKey: secKey}]);
            setError("");
            console.log(secKey);
            // console.log(props.user + " Is posting");
            axios.patch(process.env.REACT_APP_SERVER + '/api/entries/' + id, { "author": title, "text": comment, "secKey": secKey }
            ).then(res => {
                // console.log(res)
                if (res.data.err) {
                    setError(res.data.err);
                    togglePop();
                }
            }).catch(err => console.log(err));
            setComment("");
            setTitle(props.user);//reset to the signed user handle
        }
    }

    const deleteComment = (id, cid, secKey) => {
        // console.log("key", key);
        // let comsAfter = [...comments];
        // comsAfter.splice(index, 1)
        // setComments(comsAfter);
        console.log("keyzzzzzzzzz", secKey);
        const comsAfter = comments.filter(q => q.secKey ? q.secKey !== secKey : q._id !== cid);
        setComments(comsAfter);
        let link = `${process.env.REACT_APP_SERVER}/api/entries/cut/${id}/${secKey}`
        // Route 'cid' was not changed it was not recognized as 'secKey'. cid=secKey anyway.
        console.log(link);
        axios.patch(link)
            .then(res => {
            }).catch(err => console.log(err));
    }

    const date = (uTime) => {
        let local = new Date(uTime).toString().split('')
        local.splice(local.indexOf('G') - 4).join('')
        return local
    }

    const crazy = () => {
        let secKey = uuidv4();
        return secKey;
        // generates secondary key for cases where we dont want to wait for databse ids to arrive here.
        // "refreshes" with useEffect on commentchanges ar nolonger needed
    }


    return (
        <div className="QList-words">
            <div style={{ padding: "15px" }}>You can post and delete all too easily random musings here</div>

            {modal ? <PopUp message={error} togglePop={togglePop} /> : ""}
            {/* {props.user} */}
            {/* <Back link="/favs" title="blah..." /> */}
            {comments.length === 0
                ? <div style={{ padding: "15px" }}>You can quickly post and delete random musings here</div>
                : comments.map((c, idx) =>

                    <div className="Note-comments" key={idx}>
                        <div className="close" onClick={(e) => deleteComment(id, c._id, c.secKey)}>
                            <i className="fa fa-times"></i>
                        </div>
                        <p>{c.key}</p>
                        <p>{c.author} wrote: <br /> <span>{c.text}</span></p>
                        {c.time ? <p>{date(c.time)}</p> : ""}
                    </div>
                )}
            <form className="Note-form" onSubmit={SubmitHandler}>
                {/* <div>
                    <label >Name:</label><br />
                    <input className="Note-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div> */}
                <div>
                    <label >Thou sayeth:</label><br />
                    <textarea className="Note-input" cols={23} value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>

                <div>
                    <label >Post Author:</label><br />
                    <textarea className="Note-input" cols={23}
                        placeholder={`as ${props.user} or...`}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>

                <input className="btn btn-outline-secondary submit" type="submit" value="POST IT" />
            </form>
        </div>
    )
}

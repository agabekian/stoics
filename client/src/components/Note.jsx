import React, { useEffect, useState } from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "./Note.css";
import Back from './scrap/Back';
import PopUp from './PopUp';

export default (props) => {
    const { id } = props;
    const [title, setTitle] = useState("");
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const displayEntry = () => {
        // console.log("checking for props", id)
        axios.get("http://localhost:8000/api/entries/" + id)
            .then(res => setComments(res.data.comments))
            .catch(err => console.log("bummer, error:", err))
    }

    useEffect(() => { displayEntry() }, []
    )

    useEffect(() => {
        setError("");
        axios.put('http://localhost:8000/api/entries/' + id, {
            comments,
        }).then(res => {
            console.log("rezz", res);
            if (res.data.errors) {
                setErrors(res.data.errors);
            }
        }).catch(err => console.log(err));
    }, [comments]
    )
    const SubmitHandler = e => {

        e.preventDefault();
        if (title.length < 3) {
            setError("title needs 3+ chars")
        }
        else if (comment.length < 3) {
            setError("comment 3+ chars")
        }
        else {
            setComments([...comments, comment])
        }
    }

    return (
        <div className="JokeList-jokes">
            <Back link="/favs" title="wall" />
            <p>{error ? <PopUp message={error} /> : ""}</p>
            <Link to="/">Home</Link>
            <form className="Note-form" onSubmit={SubmitHandler}>
                <p className="Note-info">{id}</p>
                {comments.map(e => <span className="Note-comments" key={uuidv4()}>{e}</span>)}
                <div>
                    <label>title</label><br />
                    <input className="Note-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>comment</label><br />
                    <textarea className="Note-input" cols={23} value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <input className="btn btn-primary submit" type="submit" value="post" />
            </form>
        </div>
    )
}

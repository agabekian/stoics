import React, { useEffect, useState } from 'react'
import { Link } from '@reach/router'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "./Note.css";
import Back from './scrap/Back';
import PopUp from './PopUp';

export default (props) => {
    const { id, modal, togglePop } = props;
    const [title, setTitle] = useState("");
    const [comments, setComments] = useState([{}]);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const [sub, setSub] = useState(false);

    const displayEntry = () => {
        axios.get("http://localhost:8000/api/entries/" + id)
            .then(res => setComments(res.data.comments))
            .catch(err => console.log("bummer, error:", err))
    }

    useEffect
        (
            () => { displayEntry() }, []
        )

    // useEffect(() => {
    //     setError("");
    //     axios.patch('http://localhost:8000/api/entries/' + id, {
    //              comments
    //         // used to be whole 'comments' state above 
    //         // (whole object would get inserted into quote obj, now seperate models)
    //     }).then(res => {
    //         if (res.data.errors) {
    //             setErrors(res.data.errors);
    //         }
    //     }).catch(err => console.log(err));
    //     setComment("");
    //     setTitle("");
    // }, [comments]
    // )

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
            const date = new
                setComments([...comments, { text: comment, author: title, date: Date() }]);
            setError("");
            axios.patch('http://localhost:8000/api/entries/' + id, { "author": title, "text": comment }
            ).then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                }
            }).catch(err => console.log(err));
            setComment("");
            setTitle("");
            setSub(true)
        }
    }

    const deleteComment = (id, cid) => {
        let link = `http://localhost:8000/api/entries/cut/${id}/${cid}`
        axios.patch(link)
            .then(res => {
            }).catch(err => console.log(err));
        setComments(comments.filter(i => i._id != cid))
    }
    return (
        <div className="JokeList-jokes">
            <Back link="/favs" title="wall" />

            {modal ? <PopUp message={error} togglePop={togglePop} /> : ""}

            <Link to="/">h o m e</Link>
            {/* <p>quoteId {id}</p> */}
            {comments.map(c =>
                <div key={uuidv4()}>
                    {/* <p>{c._id}</p> */}
                    <p className="Note-comments" >{c.text} {c.author}</p>
                    <p>{c.rating}</p>
                    <button onClick={(e) => deleteComment(id, c._id)}>delete</button>
                </div>
            )}
            <form className="Note-form" onSubmit={SubmitHandler}>
                <div>
                    <label >title</label><br/>
                    <input className="Note-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label >comment</label><br/>
                    <textarea className="Note-input" cols={23} value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <input className="btn btn-primary submit" type="submit" value="post" />
            </form>
        </div>
    )
}

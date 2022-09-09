import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Back from './scrap/Back';
import PopUp from './PopUp';
import "./Note.css";

export default (props) => {
    const { id, modal, togglePop } = props;
    const [title, setTitle] = useState("");
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
            () => { displayEntry() }, [comments]
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
            setComments([...comments, { text: comment, author: title, date: Date() }]);
            setError("");
            axios.patch(process.env.REACT_APP_SERVER + '/api/entries/' + id, { "author": title, "text": comment }
            ).then(res => {
                console.log(res)
                if (res.data.err) {
                    setError(res.data.err);
                    togglePop();
                }
            }).catch(err => console.log(err));
            setComment("");
            setTitle("");
        }
    }

    const deleteComment = (id, cid, index) => {
        let link = `${process.env.REACT_APP_SERVER}/api/entries/cut/${id}/${cid}`
        axios.patch(link)
            .then(res => {
            }).catch(err => console.log(err));
    }

    const date = (uTime) => {
        let local = new Date(uTime).toString().split('')
        local.splice(local.indexOf('G') - 4).join('')
        return local
    }

    return (
        <div className="QList-words">
            <Back link="/favs" title="blah..." />
            {modal ? <PopUp message={error} togglePop={togglePop} /> : ""}
            {comments.map((c, idx) =>
                <div className="Note-comments" index={idx} key={idx}>
                    <div className="close" onClick={(e) => deleteComment(id, c._id, idx)}>
                        <i className="fa fa-times"></i>
                    </div>
                    <p>{c.author} wrote: <br /> <span>{c.text}</span></p>
                    <p>{date(c.time)}</p>
                </div>
            )}
            <form className="Note-form" onSubmit={SubmitHandler}>
                <div>
                    <label >You be?</label><br />
                    <input className="Note-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label >And thou sayeth</label><br />
                    <textarea className="Note-input" cols={23} value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <input className="btn btn-outline-secondary submit" type="submit" value="POST COMMENT" />
            </form>
        </div>
    )
}
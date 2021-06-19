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
        axios.get("http://localhost:8000/api/entries/" + id)
            .then(res => setComments(res.data.comments))
            .catch(err => console.log("bummer, error:", err))
    }

    useEffect
        (
            () => { displayEntry() }, [comments]
        );

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
            displayEntry()
            setComment("");
            setTitle("");
        }
    }

    const deleteComment = (id, cid, index) => {
        let link = `http://localhost:8000/api/entries/cut/${id}/${cid}`
        axios.patch(link)
            .then(res => {
                // setComments([...comments.filter(c => comments.indexOf(c) != index)])
                // setComments(res.data.comments)
                // displayEntry();
                // if(comments) is still not processed pop a modal
            }).catch(err => console.log(err));

    }
    return (
        <div className="JokeList-jokes">
            <Back link="/favs" title="musings" />

            {modal ? <PopUp message={error} togglePop={togglePop} /> : ""}
            {/* <p>{id}</p> */}
            {comments.map((c, idx) =>
                <div className="Note-comments" index={idx}>
                    <div className="close" onClick={(e) => deleteComment(id, c._id, idx)}>
                        <i className="fa fa-times"></i>
                    </div>
                    <p>{c.author} wrote: <br /> <span>{c.text}</span></p>
                    {/* <p>{c.rating}not rating the greats</p> */}
                </div>
            )}
            <form className="Note-form" onSubmit={SubmitHandler}>
                <div>
                    <label >Name</label><br />
                    <input className="Note-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label >Comment</label><br />
                    <textarea className="Note-input" cols={23} value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <input className="btn btn-primary submit" type="submit" value="post" />
            </form>
        </div>
    )
}

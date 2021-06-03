import React, { useEffect, useState } from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Preview from "./Preview";

export default (props) => {
    const { id } = props;
    const [title, setTitle] = useState("");
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [error, setError] = useState("")
    const [entry, setEntry] = useState({})

    const [accept, setAccept] = useState(false)

    const displayEntry = () => {
        // console.log("checking for props", id)
        axios.get("http://localhost:8000/api/entries/" + id)
            .then(res => setComments(res.data.comments))
            .catch(err => console.log("bummer, error:", err))
    }

    useEffect(() => { displayEntry() }, []
    )

    useEffect(() => {
        axios.put('http://localhost:8000/api/entries/' + id, {
            comments,
        })
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
        <>
            <p>{error ? <p className="text-danger">{error}</p> : ""}</p>
            <Link to="/">Home</Link>
            <form onSubmit={SubmitHandler}>
                <p>{id}</p>
                {comments.map(e => <div key={uuidv4()}>{e}</div>)}
                <p>{entry.data}</p>
                <div>
                    <h3>Thoughts</h3>
                    <label>Title:</label><br />
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Comment:</label><br />
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <input className="btn btn-primary" type="submit" value="Add Note" />
            </form>
        </>
    )
}

import React, { useState } from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios'

export default (props) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [error, setError] = useState("")
    const [accept, setAccept] = useState(false)



    const onSubmitHandler = e => {
        e.preventDefault();
        if (title.length < 3) {
            setError("AT LEAST 3 CHARACTERS PLEASE!")
        }
        else if (desc.length < 3) {
            setError("DESCRIPTION MUST BE AT LEAST 3 CHARACTERS PLEASE!")
        }
        else {
            setError("")
            axios.post('http://localhost:8000/api/products', {
                title,
                desc,
            })
            navigate("/")
                .then(res => setTitle(res.title))
                .catch(err => console.log(err))
        }
    }
    return (
        <>
            <h3>{error ? <p className="red">{error}</p> : ""}</h3>
            <Link to="/">Home</Link>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <h3>Thoughts</h3>
                    <label>Title:</label><br />
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Text:</label><br />
                    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <input className="btn btn-primary" type="submit" value="Add Note" />
            </form>
        </>
    )
}

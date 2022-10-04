import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavedQuote from './SavedQuote';
import './Favs.css';
import { v4 as uuidv4 } from 'uuid';

const Favs = (props) => {
    const [favs, setFavs] = useState([])

    useEffect(() => {
        props.toggleLoading();
        const getSavedQuotes = async () => {
            let savedQuotes = await axios.get(`${process.env.REACT_APP_SERVER}/api/entries`);
            setFavs(savedQuotes.data);
            props.toggleLoading();

        }
        const result = getSavedQuotes().catch(console.error);
    }, []
    )

    // const updateEntry = (entryId) => {
    //     console.log(entryId)
    //     axios.put(`${process.env.REACT_APP_SERVER}/api/entries/${entryId}`)
    //         .then(res => {
    //         }).catch(err => console.log(err));
    // }

    const deleteEntry = (entryId) => {
        console.log("deleted: ", entryId)
        axios.delete(`${process.env.REACT_APP_SERVER}/api/entries/${entryId}`)
            .then(res => {
            }).catch(err => console.log(err));
        let fFavs = favs.filter(i => i._id != entryId)
        setFavs(fFavs);
    }
    // useEffect(() => {
    //     document.body.style = 'auto';
    //     return () => { document.body.className = ''; }
    // });

    let idx = uuidv4();
    return (
        <>
            <div className="QList-words" style={{ overflow: 'auto',marginTop:0 }}>
                {props.loading ? <i className="fas fa-spinner fa-pulse" style={{ fontSize: '1rem' }} /> : ""}

                {favs.length === 0
                    ? <p className="Favs-message">No saved quotes yet, you can add them by using a "+" button</p>
                    :
                    favs.map((q, idx) =>
                    (
                        <div key={idx}>
                            <div className="close">
                                <i className="fa fa-times" onClick={(e) => { deleteEntry(q._id) }}></i>
                            </div>
                            <SavedQuote
                                qid={q.content["0"].id}
                                id={q._id}
                                text={q.content["0"].text}
                                author={q.content["0"].author}
                                source={q.content["0"].source}
                                update={props.updateEntry}
                                nums_of_comms={q.comments ? q.comments.length : 0}
                            />
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Favs;
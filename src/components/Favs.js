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

    // useEffect(() => {
    //     document.body.style = 'auto';
    //     return () => { document.body.className = ''; }
    // });

    let idx = uuidv4();
    return (
        <>
            <div className="QList-words" >
                {props.loading ? <i className="fas fa-spinner fa-pulse waiting" /> :

                    favs.length === 0
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
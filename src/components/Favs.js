import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavedQuote from './SavedQuote';
import './Favs.css';
import { v4 as uuidv4 } from 'uuid';

const Favs = (props) => {
    const { storedTopics } = props;
    // const [favs, setFavs] = useState([]);
    const [favs, setFavs] = useState(storedTopics);
    // const [favs,setFavs] = useState(JSON.parse(window.localStorage.getItem("fQuotes") || "[]"));

    useEffect(() => {
        setFavs(storedTopics);
        // props.toggleLoading();
        // const getSavedQuotes = async () => {
        //     let savedQuotes = await axios.get(`${process.env.REACT_APP_SERVER}/api/entries`);
        // setFavs(savedQuotes.data);
        // let x = JSON.parse(window.localStorage.getItem("fQuotes"));
        // setFavs(x);
        // window.localStorage.setItem("fQuotes", JSON.stringify(favs))


        // props.toggleLoading();
    }, [storedTopics])

    //     const result = getSavedQuotes().catch(console.error);
    // }, []
    // )

    const deleteEntry = (entryId) => {
        console.log("deleted: ", entryId)
        axios.delete(`${process.env.REACT_APP_SERVER}/api/entries/${entryId}`)
            .then(res => {
            }).catch(err => console.log(err));
        let fFavs = favs.filter(i => i._id != entryId)
        setFavs(fFavs);
    }

    const idx = uuidv4();
    return (
        <>
            <div className="QList-words" >
                {props.loading ? <i className="fas fa-spinner fa-pulse waiting" /> :

                    favs.length === 0
                        ? <div>
                            <p className="Favs-message">
                                No saved quotes yet, you can add them by using a "+" button
                            </p>
                            <p className="buffer">
                                No saved quotes yet, you can add them by using a "+" button next to each quote in the main list.
                            </p>
                        </div>
                        :
                        <>
                            <div className='buffer'>
                                HACKY BUFFER ZONE
                                {/* <hr /> */}
                                Here are the saved quotes to reflect and comment on:
                            </div>
                            {favs.map((q, idx) =>
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
                        </>
                }

            </div>
        </>
    )
}

export default Favs;
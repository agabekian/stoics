import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import './Favs.css';
import { v4 as uuidv4 } from 'uuid';
import Back from './scrap/Back';
require('dotenv').config()

export default class Favs extends Component {
    constructor(props) {
        super(props);
        this.state = { favs: [] }
        this.deleteEntry = this.deleteEntry.bind(this)
    }

    getSavedQuotes() {
        axios.get(`${process.env.REACT_APP_SERVER}/api/entries`)
            .then(res => {
                this.setState({ favs: res.data })
            })
    }

    componentDidMount() {
        this.getSavedQuotes();
    }

    updateEntry(entryId) {
        console.log(entryId)
        axios.put(`${process.env.REACT_APP_SERVER}/api/entries/${entryId}`)
            .then(res => {
            }).catch(err => console.log(err));
    }

    deleteEntry(entryId) {
        console.log("deleted: ", entryId)
        axios.delete(`${process.env.REACT_APP_SERVER}/api/entries/${entryId}`)
            .then(res => {
            }).catch(err => console.log(err));
        this.setState({ favs: this.state.favs.filter(i => i._id != entryId) })
    }

    render() {
        let idx = uuidv4();
        return (
            <>
            <div className="QList-words">
                <Back title="saved" link="/" />
                {this.state.favs.length === 0
                    ? <p className="Favs-message">No saved quotes yet, you can add them by using a "+" button</p>
                    : this.state.favs.map((q, idx) =>
                    (
                        <div key={idx}>
                            <div className="close">
                                <i className="fa fa-times" onClick={(e) => { this.deleteEntry(q._id) }}></i>
                            </div>
                            <List
                                qid={q.content["0"].id}
                                id={q._id}
                                text={q.content["0"].text}
                                author={q.content["0"].author}
                                source={q.content["0"].source}
                                update={this.updateEntry}
                                nums_of_comms={q.comments ? q.comments.length : 0}
                            />
                        </div>
                    ))}
            </div>
            </>
        )
    }
}

import React, { Component } from 'react';
import './Quote.css';
import { Route, Routes, Link } from "react-router-dom";//to SavedQuote

export default class SavedQuote extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Quote">
                <div className="Quote-text">
                    <p>{this.props.text}</p><br />
                    <span>{this.props.author}<br />
                        {this.props.source}
                        <br />
                        <Link
                            to={`/notes/${this.props.id}/`}
                            style={{ fontFamily: "arial", fontSize: ".7rem", letterSpacing: ".6px" }}>
                            notes ({this.props.nums_of_comms})
                        </Link>
                    </span>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import './Joke.css';
import { Link } from '@reach/router';



export default class List extends Component {

    render() {
        return (
            <div className="Joke">
                <div className="Joke-text">
                    {/* <p>{this.props.qid}</p> */}
                    <p>{this.props.text}</p>
                    <br />
                    <span>{this.props.author}<br />
                        {this.props.source}
                        <br />
                        <Link to={`/note/${this.props.id}/`} style={{ fontFamily: "roboto", letterSpacing: "1px" }}>annotate</Link>
                    </span>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import './Joke.css';
import { Link } from '@reach/router';



export default class List extends Component {
    constructor(props){
        super(props);
    }


    render() {
        return (
            <div className="Joke">
                <div className="Joke-text">
                    {/* <p>{this.props.id}</p> */}
                    <p>{this.props.text}</p>
                    <br />
                    <span>{this.props.author}<br />
                        {this.props.source}
                        <br />
                        <Link to={`/note/${this.props.id}/`} style={{ fontFamily: "arial", fontSize:".7rem", letterSpacing: ".6px" }}>notes ({this.props.nums_of_comms})</Link>
                    </span>
                </div>
            </div>
        )
    }
}

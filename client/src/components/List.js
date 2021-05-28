import React, { Component } from 'react';
import './Joke.css';


export default class List extends Component {

    handleClick = () => alert("mmm");

    render() {

        return (
            <div className="Joke">
                <div className="Joke-text">
                    <p>{this.props.qid}</p>
                    <p>{this.props.text}</p>
                    <br />
                    <span>{this.props.author}<br />
                        {this.props.source}
                    </span>
                </div>
            </div>
        )
    }
}

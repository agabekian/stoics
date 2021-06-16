import React, { Component } from 'react';
import './Joke.css';
import GetFace from './GetFace';

export default class Joke extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.addThis(this.props.id);
    }


    render() {
        const source = this.props.source;
        const getSource = source =>
            source.includes("Meditations") ? <a href="http://classics.mit.edu/Antoninus/meditations.mb.txt" target="_blank">Mediations</a> : this.props.source

        return (

            <div className="Joke">
                <GetFace source={this.props.source} author={this.props.author} />
                {/* <div className="Joke-buttons">
                    <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
                    <span className="Joke-votes">{this.props.votes}</span>
                    <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>
                </div> */}
                <div className="Joke-text">
                    <p></p>{this.props.text}
                    <br />
                    <span>{this.props.author},<br></br> {getSource(source)}</span>
                    <button className="Joke-addButton" onClick={this.handleClick}>+</button>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import './Quote.css';
import GetFace from './GetFace';

export default class Quote extends Component {
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
            <>
                <div className="Quote">
                    <GetFace source={this.props.source} author={this.props.author} />
                    <div className="Quote-text">
                        <button className="Quote-addButton" onClick={this.handleClick}>+</button>
                        {this.props.text}
                        <br />
                        <span>{this.props.author},<br />{getSource(source)}</span>
                    </div>
                </div>
            </>
        )
    }
}

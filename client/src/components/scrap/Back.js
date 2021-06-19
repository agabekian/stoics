import React, { Component } from 'react'
import { Link } from '@reach/router';
import "../Favs.css"


export default class Back extends Component {
    render() {
        return (
            <div>
                <div className="Favs-back">
                    <Link to={this.props.link} style={{ color: 'white' }}><span className="arrow"><i className="fas fa-angle-left"></i></span></Link>
                    <Link to="/"><i className ="fas fa-archway home "></i></Link>

                    <p className="Favs-title">{this.props.title}</p>
                </div>
            </div>
        )
    }
}

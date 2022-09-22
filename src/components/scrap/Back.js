import React, { Component } from 'react'
import "../Favs.css"


export default class Back extends Component {
    render() {
        return (
            <div>
                <div className="Favs-back">
                    <Link to={this.props.link} style={{ color: 'white' }}>
                        <i className="fas fa-angle-left arrow"></i>
                    </Link>
                    <Link to="/">
                        <i className="fas fa-archway home " ></i>
                    </Link>
                    <span className="Favs-title"> {this.props.title} </span>
                </div>
            </div>
        )
    }
}

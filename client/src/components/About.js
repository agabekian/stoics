import React, { Component } from 'react'
import "./About.css"

export default class About extends Component {
    render() {
        return (
            <div className="About-title">
                {this.props.loading ?
                    <div>
                        <p>Getting the wisdom...</p>
                        <i className="fas fa-spinner fa-pulse" style={{ fontSize: '4rem' }}></i>
                    </div>
                    : null
                }
                <hr></hr>
                <p>armasconi@gmail.com</p>
            </div>
        )
    }
}

import React, { Component } from 'react'
import "./About.css";
import { Link } from '@reach/router';


export default class About extends Component {

    render() {
        return (
            <div className="About">
                <div>
                    {this.props.loading ?
                        <div>
                            <p>Getting the wisdom...</p>
                            <i className="fas fa-spinner fa-pulse" style={{ fontSize: '4rem' }}></i>
                        </div>
                        :
                        <div onClick={this.props.about}>
                            <hr />
                            {/* <p onClick={() => window.location.href = `mailto:${this.props.email}`}>email</p> */}
                            <p>Armen Agabekian (v2021-22)*</p>
                            <a href="mailto:armasconi@gmail.com">email</a>
                            <hr />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

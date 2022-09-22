import React, { Component } from 'react'

export default class About extends Component {

    render() {
        return (
            <div className="About" style={{textAlign:"center" ,fontFamily:"Cinzel"}}>
                <div>
                    {this.props.loading ?
                        <div>
                            <i className="fas fa-spinner fa-pulse" style={{ fontSize: '4rem' }}></i>
                            <p>Getting the wisdom...</p>
                        </div>
                        :
                        <div onClick={this.props.toggleAbout} style={{fontFamily:"Cinzel"}}>
                            <hr />
                            <p style={{color:'grey'}} >Stoic Companion</p>
                            {'\u00F7'} 
                            <p>Armen Agabekian (2022)</p>
                            <a style={{color:'grey'}} href="mailto:armasconi@gmail.com">email</a>
                            <hr />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'

export default class About extends Component {

    render() {
        return (
            <div  style={{fontFamily:"Cinzel",color:'white'}}>
                <div>
                    {this.props.loading ?
                        <div>
                            <i className="fas fa-spinner fa-pulse" style={{ fontSize: '4rem' }}></i>
                            <p>Getting the wisdom...</p>
                        </div>
                        :
                        <div onClick={this.props.toggleAbout} >
                            <hr />
                            <p style={{color:'white'}} >Stoic Companion</p>
                            {'\u00F7'} 
                            <p>Armen Agabekian (2022)</p>
                            <a style={{color:'white'}} href="mailto:armasconi@gmail.com">email</a>
                            <hr />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

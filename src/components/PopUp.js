import React, { Component } from "react";
import "./Favs.css"

export default class PopUp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.props.togglePop()
        }, 1000);
        return () => clearTimeout(timer);
    };

    render() {
        return (
            <div className="modal_content" onClick={this.props.togglePop} style={{backgroundColor:this.props.bColor,color:this.props.fontColor}}>
                {this.props.message ? this.props.message :
                
                this.props.dupe ? "Already  saved!" : "Saved the quote."
                }
            </div>
        )
    }
}
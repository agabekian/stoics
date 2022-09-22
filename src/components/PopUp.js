import React, { Component } from "react";
import "./Favs.css"

export default class PopUp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.autoClose) {
            const timer = setTimeout(() => {
                this.props.togglePop()
            }, 1000);

            return () => clearTimeout(timer);
        }
        console.log("sticky  modal");

    };

    render() {
        return (
            <div className="modal_content" onClick={this.props.toggleAbout} style={{ backgroundColor: this.props.bColor, color: this.props.fontColor }}>
                {this.props.message ? this.props.message :
                    this.props.dupe ? "Already  saved! Tap this popup to open" : "Saved the quote."
                }
            </div>
        )
    }
}
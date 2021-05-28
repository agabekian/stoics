import React, { Component } from "react";
import "./Favs.css"

export default class PopUp extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.props.togglePop()
        }, 1000);
        return () => clearTimeout(timer);
    };

    render() {
        return (
            <div>
                <div className="modal_content">
                    {this.props.dupe? <p>Already  saved!</p>:<p>Saved the quote.</p>}
                </div>
            </div>

        )
    }
}
import React, { Component } from "react";

export default class Message extends Component {
  render() {
    return (
      <div
        className="About"
        style={{ textAlign: "center", fontFamily: "Cinzel" }}
      >
            <div>
              <i className="fas fa-spinner fa-pulse" style={{ fontSize: "4rem" }}></i>
              <p>Getting the wisdom...</p>
            </div>
        </div>
    );
  }
}

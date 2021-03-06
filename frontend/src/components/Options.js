import React, { Component } from "react";
import "../css/Switch.css";

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      private: this.props.private
    };
    this.submitPrivate = this.submitPrivate.bind(this);
  }
  submitPrivate() {
    fetch("/api/options", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        private: this.state.private
      })
    });
  }
  render() {
    return (
      <div className="options">
        <h1>OPTIONS</h1>

        <div className="item">
          <p>Private</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={this.state.private}
              onChange={() =>
                this.setState({private: !this.state.private}, () =>
                  this.submitPrivate())
              }
            />
            <div className="slider round"></div>
          </label>
        </div>
      </div>
    );
  }
}
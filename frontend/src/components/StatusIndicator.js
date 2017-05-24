import React, { Component } from "react";
import { StatusColors } from "../Colors";
import "../css/Status.css";


export default class StatusIndicator extends Component {
  render() {
    let [color, message] = StatusColors[this.props.state];
    return (
      <p className="status" style={{backgroundColor: color}}>
        {message}
      </p>
    );
  }
}

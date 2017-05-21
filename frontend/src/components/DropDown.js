import React, { Component } from "react";
import "../css/DropDown.css";

export default class DropDown extends Component {
  render() {
    return (
      <div className="dropdown">
        <p className="current">WEEK</p>
        <div className="options">
          <p>WEEK</p>
          <p>MONTH</p>
          <p>YEAR</p>
          <p>ALL</p>
        </div>
      </div>
    );
  }
}
import React, { Component } from "react";

export default class Heading extends Component {
  render() {
    return (
      <div className="heading">
        {this.props.text}
      </div>
    );
  }
}
import React, { Component } from "react";

export default class Heading extends Component {
  render() {
    return (
      <div className="heading" style={{backgroundColor: this.props.color}}>
        {this.props.text}
      </div>
    );
  }
}
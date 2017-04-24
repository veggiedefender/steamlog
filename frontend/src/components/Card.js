import React, { Component } from "react";

export default class Card extends Component {
  render() {
    const title = (
      <p
        className="card_title"
        style={{
          backgroundColor: this.props.color,
          margin: 0
        }}
      >
        {this.props.title}
      </p>
    );
    return (
      <div className="card" style={this.props.style}>
        {this.props.title ? title : null}
        <div className="card_content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
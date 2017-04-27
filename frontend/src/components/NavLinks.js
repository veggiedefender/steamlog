import React, { Component } from "react";

export default class NavLinks extends Component {
  render() {
    return (
      <div className="navLinks">
        {this.props.items.map((item, i) => (
          <a href={item.link} key={i}>{item.text}</a>
        ))}
      </div>
    );
  }
}
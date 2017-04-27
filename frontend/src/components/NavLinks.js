import React, { Component } from "react";

export default class NavLinks extends Component {
  render() {
    return (
      <div className="navLinks">
        {this.props.items.map((item) => (
          <a href={item.link} key={item.link}>{item.text}</a>
        ))}
      </div>
    );
  }
}
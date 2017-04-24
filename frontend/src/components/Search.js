import React, { Component } from "react";


export default class Search extends Component {
  render() {
    return (
      <div className="search_wrapper" style={this.props.style}>
        <input
          className="search"
          type="text"
          placeholder="Search"
        />
        <i className="fa fa-search" aria-hidden="true"></i>
      </div>
    );
  }
}
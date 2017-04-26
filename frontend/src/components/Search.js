import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <div className="search_wrapper">
        <input
          type="text"
          className="search"
          placeholder="Search"
        />
      </div>
    );
  }
}
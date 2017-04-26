import React, { Component } from "react";
import "../css/NavBar.css";

import Search from "./Search";

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav">
        <h1>stea<b>metrics</b></h1>
        <Search />
      </div>
    );
  }
}
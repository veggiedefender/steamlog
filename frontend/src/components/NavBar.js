import React, { Component } from "react";
import "../css/NavBar.css";

import Search from "./Search";
import NavLinks from "./NavLinks";

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav">
        <h1>STEA<b>METRICS</b></h1>
        <Search />
        <NavLinks />
      </div>
    );
  }
}
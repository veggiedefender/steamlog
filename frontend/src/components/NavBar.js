import React, { Component } from "react";
import "../css/NavBar.css";

import Search from "./Search";
import NavLinks from "./NavLinks";

export default class NavBar extends Component {
  constructor() {
    super();
    this.items = [
      {text: "global stats", link: "/"},
      {text: "sign in", link: "/login"}
    ];
  }
  render() {
    return (
      <div className="nav">
        <h1><a href="/">STEA<b>METRICS</b></a></h1>
        <Search />
        <NavLinks items={this.items}/>
      </div>
    );
  }
}
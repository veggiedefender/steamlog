import React, { Component } from "react";
import "../../css/NavBar.css";

import Search from "./Search/Search";
import NavLinks from "./NavLinks";

export default class NavBar extends Component {
  render() {
    let signIn = {
      text: this.props.loggedIn ? "sign out" : "sign in",
      link: this.props.loggedIn ? "/logout" : "/login",
    }
    signIn.link += `?next=${window.location.href}`
    let items = [
      signIn
    ].reverse();
    return (
      <div className="nav">
        <h1><a href="/">STEA<b>METRICS</b></a></h1>
        <Search />
        <NavLinks items={items}/>
      </div>
    );
  }
}

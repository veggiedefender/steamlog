import React, { Component } from "react";
import { SteamProfile } from "../Constants";
import "../css/SteamProfileLink.css";

export default class Profile extends Component {
  render() {
    const url = SteamProfile + this.props.steam_id;
    return (
      <a href={url} className="steamProfileLink">
        <i className="fa fa-steam" aria-hidden="true"></i>
        STEAM PROFILE
      </a>
    );
  }
}

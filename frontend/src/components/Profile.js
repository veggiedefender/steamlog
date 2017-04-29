import React, { Component } from "react";
import { StatusColors } from "../Colors";
import "../css/Profile.css";

import SteamProfileLink from "./SteamProfileLink";
import { ProfilePic } from "../Constants";
import StatusIndicator from "./StatusIndicator";

export default class Profile extends Component {
  render() {
    const image_url = `${ProfilePic}${this.props.info.picture}_full.jpg`;
    let color = StatusColors[this.props.info.state][0];
    const background = `linear-gradient(to bottom, ${color} 0%, ${color} 45%, #000000 45%, white 45%, white 100%)`;
    const refresh = "fa fa-refresh " + this.props.refreshing
    return (
      <div className="card profile">
        <i className={refresh} aria-hidden="true" onClick={this.props.refresh}></i>
        <div className="image_wrapper" style={{background: background}}>          
          <img src={image_url} alt="profile avatar" />
        </div>
        <div className="title">
          <h1>{this.props.info.name}</h1>
          <StatusIndicator state={this.props.info.state} />
        </div>
        <SteamProfileLink steam_id={this.props.info.steam_id} />
      </div>
    );
  }
}

import React, { Component } from "react";
import "../css/Profile.css";

import SteamProfileLink from "./SteamProfileLink";
import { ProfilePic } from "../Constants";
import StatusIndicator from "./StatusIndicator";

export default class Profile extends Component {
  render() {
    const color = this.props.color;
    const image_url = `${ProfilePic}${this.props.profile.picture}_full.jpg`;
    const refresh = "fa fa-refresh " + (this.props.refreshing ? "spinning" : "");
    return (
      <div className="card profile">
        <div className="color" style={{backgroundColor: color}}>
          <div className="controls">
            <i className="fa fa-cog" aria-hidden="true"></i>
            <i className={refresh} aria-hidden="true" onClick={this.props.refresh}></i>
          </div>
          <img src={image_url} alt="profile avatar" />
        </div>

        <div className="main">
          <div className="title">
            <h1>{this.props.profile.name}</h1>
            <StatusIndicator state={this.props.profile.state} />
          </div>
          <SteamProfileLink />
        </div>
      </div>
    );
  }
}

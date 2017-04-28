import React, { Component } from "react";
import { ProfilePic } from "../Constants";
import { StatusColors } from "../Colors";
import "../css/Profile.css";

import SteamProfileLink from "./SteamProfileLink";

export default class Profile extends Component {
  render() {
    const image_url = `${ProfilePic}${this.props.info.picture}_full.jpg`;
    let [color, message] = StatusColors[this.props.info.state];
    const background = `linear-gradient(to bottom, ${color} 0%, ${color} 45%, #000000 45%, white 45%, white 100%)`;
    return (
      <div className="card profile">
        <i className="fa fa-refresh" aria-hidden="true" onClick={this.props.refresh}></i>
        <div className="image_wrapper" style={{background: background}}>          
          <img src={image_url} alt="profile avatar" />
        </div>
        <div className="title">
          <h1>{this.props.info.name}</h1>
          <p className="status" style={{backgroundColor: color}}>
            {message}
          </p>
        </div>
        <SteamProfileLink steam_id={this.props.info.steam_id} />
      </div>
    );
  }
}

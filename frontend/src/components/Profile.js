import React, { Component } from "react";
import "../css/Profile.css";

import SteamProfileLink from "./SteamProfileLink";
import { ProfilePic } from "../Constants";
import StatusIndicator from "./StatusIndicator";
import Options from "./Options";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      optionsOpen: false
    };
    this.toggleOptions = this.toggleOptions.bind(this);
  }
  toggleOptions() {
    this.setState({ optionsOpen: !this.state.optionsOpen });
  }
  render() {
    const color = this.props.color;
    const image_url = `${ProfilePic}${this.props.profile.picture}_full.jpg`;
    const refresh = "fa fa-refresh " + (this.props.refreshing ? "spinning" : "");
    return (
      <div className="card profile">
        <div className="color" style={{backgroundColor: color}}>

          <div className="controls">
            { this.props.profile.my ?
              <i
                className="fa fa-cog"
                aria-hidden="true"
                onClick={this.toggleOptions}
              >
              </i>
            :null }
            <i className={refresh} aria-hidden="true" onClick={this.props.refresh}></i>
          </div>

          {this.state.optionsOpen ?
            <Options
              private={this.props.profile.private}
              toggle={this.toggleOptions}
            /> 
          :null }

          <img src={image_url} alt="profile avatar" />
        </div>

        <div className="main">
          <div className="title">
            <h1>{this.props.profile.name}</h1>
            <StatusIndicator state={this.props.profile.state} />
          </div>
          <SteamProfileLink steam_id={this.props.profile.steam_id} />
        </div>
      </div>
    );
  }
}

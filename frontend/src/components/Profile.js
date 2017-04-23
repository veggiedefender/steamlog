import React, { Component } from "react";
import Card from "./Card";
import { StatusColors } from "../Colors";
import SteamProfileLink from "./SteamProfileLink";

export default class Profile extends Component {
  render() {
    const picture = `http://cdn.edgecast.steamstatic.com/steamcommunity/public/images/avatars/af/${this.props.info.picture}_full.jpg`;
    return (
      <Card style={{textAlign: "center"}}>
        <img src={picture} alt="profile" className="profile_pic" />
        <h1 style={{fontSize: "26px", marginBottom: "0.5em"}}>
          {this.props.info.name}
          <span style={{color: StatusColors[this.props.info.state]}}> ◉</span>
        </h1>
        <SteamProfileLink
          steam_id={this.props.info.steam_id}
          style={{marginBottom: "1em"}}
        />
      </Card>
    );
  }
}
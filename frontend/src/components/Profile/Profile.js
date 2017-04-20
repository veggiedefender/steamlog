import React, { Component } from "react";
import Card from "../Card";
import Colors from "../../Colors";
import SteamProfileLink from "../SteamProfileLink";

export default class Profile extends Component {
  render() {
    const status_colors = [
      Colors.gray,   //offline
      Colors.blue,   //online
      Colors.red,    //busy
      Colors.orange, //away
      Colors.yellow, //snooze
      Colors.blue,   //looking to trade
      Colors.blue,   //looking to play
      Colors.green   //in game
    ]
    const picture = `http://cdn.edgecast.steamstatic.com/steamcommunity/public/images/avatars/af/${this.props.info.picture}_full.jpg`;
    return (
      <Card style={{textAlign: "center"}}>
        <img src={picture} alt="profile" className="profile_pic" />
        <h1
          style={{
            fontSize: "26px",
            marginBottom: "0.5em"
        }}>
          {this.props.info.name}
          <span style={{color: status_colors[this.props.info.state]}}> ◉</span>
        </h1>
        <SteamProfileLink
          steam_id={this.props.info.steam_id}
          style={{marginBottom: "1em"}}
        />
      </Card>
    );
  }
}
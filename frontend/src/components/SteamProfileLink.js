import React, { Component } from "react";

export default class SteamProfileLink extends Component {
  render() {
    const url = `http://steamcommunity.com/profiles/${this.props.steam_id}`;
    return (
      <a href={url}>
        <div
          className="steamProfileLink"
          style={this.props.style}
        >
          <i
            className="fa fa-steam"
            aria-hidden="true"
            style={{
              fontSize: "1.3em",
              verticalAlign: "middle",
              paddingRight: "1ch"
            }}
          >
          </i>
          {this.props.steam_id}
        </div>
      </a>
    )
  }
}
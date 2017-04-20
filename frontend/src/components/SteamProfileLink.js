import React, { Component } from "react";

export default class SteamProfileLink extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    window.open(`http://steamcommunity.com/profiles/${this.props.steam_id}`);
  }
  render() {
    return (
      <div
        className="steamProfileLink"
        onClick={this.handleClick}
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
    )
  }
}
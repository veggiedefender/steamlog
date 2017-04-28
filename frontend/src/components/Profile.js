import React, { Component } from "react";
import { ProfilePic } from "../Constants";
import { StatusColors } from "../Colors";
import "../css/Profile.css";

export default class Profile extends Component {
  render() {
    const image_url = `${ProfilePic}${this.props.info.picture}_full.jpg`;
    let [color, message] = StatusColors[this.props.info.state];
    if (this.props.events.length > 0 && this.props.info.state === 7) {
      message += `: ${this.props.events[this.props.events.length - 1].name}`
    }
    const background = `linear-gradient(to bottom, ${color} 0%,${color} 45%,#000000 45%,white 45%,white 100%)`
    return (
      <div className="card profile">
        <div className="image_wrapper" style={{background: background}}>
          <img src={image_url} alt="profile avatar" />
        </div>
        <div className="title">
          <h1>{this.props.info.name}</h1>
          <div className="status" style={{backgroundColor: color}} title={message}>
            {message}
          </div>
        </div>
      </div>
    );
  }
}

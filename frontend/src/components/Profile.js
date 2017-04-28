import React, { Component } from "react";
import { ProfilePic } from "../Constants";
import { StatusColors } from "../Colors";
import "../css/Profile.css";

export default class Profile extends Component {
  render() {
    const image_url = `${ProfilePic}${this.props.info.picture}_full.jpg`;
    const [color, message] = StatusColors[this.props.info.state];
    const background = `linear-gradient(to bottom, ${color} 0%,${color} 45%,#000000 45%,white 45%,white 100%)`
    return (
      <div className="card profile">
        <div className="image_wrapper" style={{background: background}}>
          <img src={image_url} alt="profile avatar" />
        </div>
        <div className="title">
          <h1>{this.props.info.name}</h1>
          <div className="status" style={{backgroundColor: color}}>
            {message}
          </div>
        </div>
      </div>
    );
  }
}
import React, { Component } from "react";
import "../css/Content.css";

import Profile from "./Profile";

export default class Content extends Component {
  render() {
    return (
      <div className="content">
        <Profile
          info={this.props.info}
          events={this.props.events}
        />
      </div>
    );
  }
}

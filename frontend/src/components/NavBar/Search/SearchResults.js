import React, { Component } from "react";
import { ProfilePic } from "../../../Constants";
import StatusIndicator from "../../StatusIndicator";

export default class SearchResults extends Component {
  render() {
    if (this.props.results.length > 0) {
      return (
        <div className="searchResults">
          {this.props.results.map((result) => (
            <Result key={result.steam_id} info={result}/>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}

class Result extends Component {
  render() {
    const picture = `${ProfilePic}${this.props.info.picture}.jpg`;
    return (
      <a className="result" href={`/profiles/${this.props.info.steam_id}`}>
        <img src={picture} alt="profile avatar preview" />
        <span className="name">{this.props.info.name}</span>
        <StatusIndicator state={this.props.info.state} />
      </a>
    );
  }
}
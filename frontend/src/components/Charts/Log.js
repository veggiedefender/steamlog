import React, { Component } from "react";
import "../../css/Log.css";

export default class Log extends Component {
  constructor() {
    super();
    this.format = this.format.bind(this);
    this.state = { full: false };
  }
  format(event) {
    function format(date) {
      let day = `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}`;
      let time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
      return `${day} ${time}`;
    }
    function pad(n){
      return n > 9 ? "" + n : "0" + n;
    }
    return(
      <p>
        {format(event.start_time)} - {format(event.stop_time)}
        <span> {event.game_name} </span>
        ({((event.stop_time - event.start_time) / 3600000).toFixed(2)} hours)
      </p>
    )
  }
  render() {
    let displayed;
    if (this.state.full) {
      displayed = this.props.events;
    } else {
      displayed = this.props.events.slice(0, 7);
    }

    return (
      <div className="log">
        <div className="chart">
          {displayed.map(this.format)}
        </div>
        <button
          style={{backgroundColor: this.props.color}}
          onClick={(e) => this.setState({ full: !this.state.full })}
          className={this.state.full ? "clear" : ""}
        >
        VIEW {this.state.full ? "LESS" : "MORE"}
        </button>
        {!this.state.full ?
          <div className="gradient"></div>
        :null}
      </div>
    );
  }
}
import React, { Component } from "react";
import "./css/app.css";
import "./css/Card.css";
import "./css/Private.css";
import { StatusColors } from "./Colors";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";

import Weekday from "./components/Charts/Weekday";
import PieChart from "./components/Charts/PieChart";
import SessionLength from "./components/Charts/SessionLength";
import Log from "./components/Charts/Log";

import Profile from "./components/Profile";
import Heading from "./components/Heading";

const convertEvents = (json) => json.events.map((event) => ({
  game_id: event.game_id,
  game_name: json.names[event.game_id],
  start_time: new Date(event.start_time * 1000),
  stop_time: (event.stop_time == null ?
    new Date() : new Date(event.stop_time * 1000))
}));

async function getData(steam_id, scale="week") {
  let data = await fetch(`/api/events/${steam_id}`, {credentials: "same-origin"});
  data = await data.json();
  return { events: convertEvents(data) };
}

class App extends Component {
  constructor() {
    super();
    this.refresh = this.refresh.bind(this);
    this.state = {
      info: window.info,
      loggedIn: window.loggedIn,
      events: [],
      refreshing: false
    }
  }
  async componentDidMount() {
    let data = await getData(this.props.info.steam_id);
    this.setState(data);
  }
  async refresh() {
    this.setState({
      refreshing: true
    });
    let info = fetch(`/api/profiles/${this.props.info.steam_id}`, {credentials: "same-origin"});
    let events = getData(this.props.info.steam_id);
    this.setState({
      info: await (await info).json(),
      events: (await events).events,
      refreshing: false
    });
  }
  render() {
    const color = StatusColors[this.state.info.state][0];
    return (
      <div className="app">
        <NavBar loggedIn={this.state.loggedIn} />

        <div className="container">
          <Profile
            info={this.state.info}
            events={this.state.events}
            refresh={this.refresh}
            refreshing={this.state.refreshing}
          />
          {!this.state.info.private ?
          <div>
            <div className="row">
              <div className="card">
                <Heading text="Session Length" color={color} />
                <SessionLength events={this.state.events} />
              </div>
            </div>

            <div className="row">
              <div className="card">
                <Heading text="Weekday" color={color} />
                <Weekday events={this.state.events} />
              </div>

              <div className="card">
                <Heading text="Game Breakdown" color={color} />
                <PieChart events={this.state.events} />
              </div>
            </div>

            <div className="row">
              <div className="card">
                <Heading text="Full Log" color={color} />
                <Log events={this.state.events} color={color} />
              </div>
            </div>            
          </div>

          :
          <div className="row">
            <div className="card">
              <Heading text="Private" color={color} />
              <div className="chart private">
                <i className="fa fa-eye-slash" aria-hidden="true"></i>
                <p>This profile is private.</p>
              </div>
            </div>
          </div>
          }
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
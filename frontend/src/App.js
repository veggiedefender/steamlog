import React, { Component } from "react";
import "./css/app.css";

import NavBar from "./components/NavBar/NavBar";
import Content from "./components/Content";

const convertEvents = (json) => json.events.map((event) => ({
  game_id: event.game_id,
  name: json.names[event.game_id],
  start_time: new Date(event.start_time * 1000),
  stop_time: (event.stop_time == null ?
    null : new Date(event.stop_time * 1000))
}));

async function getData(steam_id, scale="week") {
  let data = await fetch(`/api/events/${steam_id}`);
  data = convertEvents(await data.json());
  console.log(data);
  return data;
}

class App extends Component {
  constructor() {
    super();
    this.refresh = this.refresh.bind(this);
    this.state = {
      info: window.info,
      events: [],
      refreshing: false
    }
  }
  async componentDidMount() {
    let data = await getData(this.props.info.steam_id);
    this.setState({events: data});
  }
  async refresh() {
    this.setState({
      events: [],
      refreshing: true
    });
    let info = fetch(`/api/profiles/${this.props.info.steam_id}`);
    let events = getData(this.props.info.steam_id);
    this.setState({
      info: await (await info).json(),
      events: await events,
      refreshing: false
    })
  }
  render() {
    return (
      <div className="app">
        <NavBar />
        <div className="container">
          <Content
            info={this.state.info}
            events={this.state.events}
            refresh={this.refresh}
            refreshing={this.state.refreshing}
          />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./css/app.css";

import NavBar from "./components/NavBar/NavBar";
import Content from "./components/Content";

const convertDates = (json) => json.map((event) => ({
  game_id: event.game_id,
  start_time: new Date(event.start_time * 1000),
  stop_time: (event.stop_time == null ?
    null : new Date(event.stop_time * 1000))
}));

async function getData(steam_id, scale="week") {
  let data = await fetch(`/api/events/${steam_id}`);
  return convertDates(await data.json());
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      info: window.info,
      events: {}
    }
  }
  async componentDidMount() {
    let data = await getData(this.props.info.steam_id);
    console.log(data);
    this.setState({events: data});
  }
  render() {
    return (
      <div className="app">
        <NavBar />
        <div className="container">
          <Content
            info={this.state.info}
            events={this.state.events}
          />
        </div>
      </div>
    );
  }
}

export default App;

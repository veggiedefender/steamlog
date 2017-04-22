import React, { Component } from "react";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/app.css";
import Profile from "./components/Profile/Profile";
import Card from "./components/Card";
import Search from "./components/Search";

const preprocess = (json) => (json.map((event) => ({
  game_id: event.game_id,
  start_time: new Date(event.start_time * 1000),
  stop_time: (event.stop_time == null ?
    null : new Date(event.stop_time * 1000))
})));

class App extends Component {
  componentDidMount() {
    fetch(`/api/events/${this.props.info.steam_id}`)
      .then((data) => data.json())
      .then((json) => preprocess(json))
      .then((data) => {
        console.log(data);
        this.setState({events: data});
      })
      .catch((err) => alert(`Error: ${err}`));
  }
  render() {
    return (
      <div className="container">
      
        <div className="row">
          <div className="twelve columns">
            <Search />
          </div>
        </div>

        <div className="row">
          <div className="four columns">
            <Profile info={this.props.info} />
          </div>
          <div className="eight columns">
            <Card>Placeholder</Card>
          </div>
        </div>

      </div>
    );
  }
}

export default App;

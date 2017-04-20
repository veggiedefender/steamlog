import React, { Component } from "react";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/app.css";
import Profile from "./components/Profile/Profile";
import Card from "./components/Card";

class App extends Component {
  componentDidMount() {
    fetch(`/api/events/${this.props.info.steam_id}`)
      .then((data) => data.json())
      .then((json) => {
        console.log(json);
        this.setState({events: json})
      })
      .catch((err) => alert(`Error: ${err}`));
  }
  render() {
    return (
      <div className="container">
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

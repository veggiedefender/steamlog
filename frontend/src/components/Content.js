import React, { Component } from "react";
import "../css/Card.css";

import Profile from "./Profile";

import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import LineGraph from "./Charts/LineGraph";

import Heading from "./Heading";

export default class Content extends Component {
  render() {
    return (
      <div className="content">
        <Profile
          info={this.props.info}
          events={this.props.events}
          refresh={this.props.refresh}
        />

        <div className="row">
          <div className="card">
            <Heading text="Bar Chart" />
            <BarChart />
          </div>

          <div className="card">
            <Heading text="Pie Chart" />
            <PieChart />
          </div>
        </div>

        <div className="card">
          <Heading text="Line Graph" />
          <LineGraph />
        </div>
      </div>
    );
  }
}

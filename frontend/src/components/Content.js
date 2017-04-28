import React, { Component } from "react";
import "../css/Card.css";
import { StatusColors } from "../Colors";

import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import LineGraph from "./Charts/LineGraph";

import Profile from "./Profile";
import Heading from "./Heading";

export default class Content extends Component {
  render() {
    const color = StatusColors[this.props.info.state][0];
    return (
      <div className="content">
        <Profile
          info={this.props.info}
          events={this.props.events}
          refresh={this.props.refresh}
        />

        <div className="row">
          <div className="card">
            <Heading text="Bar Chart" color={color} />
            <BarChart />
          </div>

          <div className="card">
            <Heading text="Pie Chart" color={color} />
            <PieChart />
          </div>
        </div>

        <div className="card">
          <Heading text="Line Graph" color={color} />
          <LineGraph />
        </div>
      </div>
    );
  }
}

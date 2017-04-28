import React, { Component } from "react";
import "../css/Content.css";

import Profile from "./Profile";

import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import LineGraph from "./Charts/LineGraph";


export default class Content extends Component {
  render() {
    return (
      <div className="content">
        <Profile
          info={this.props.info}
          events={this.props.events}
        />

        <div className="row">
          <div className="card">
            <BarChart />
          </div>

          <div className="card">
            <PieChart />
          </div>
        </div>

        <div className="card">
          <LineGraph />
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Heading from "./Heading";

export default class ChartCard extends Component {
  render() {
    const chart = this.props.chart;
    return (
      <div className="card">
        <Heading text={this.props.heading} color={this.props.color} />
        {this.props.children}
      </div>
    );
  }
}
import React, { Component } from "react";
import {Line} from "react-chartjs-2";

export default class StackedArea extends Component {
  render() {
    let points = [];
    this.props.events.forEach((event) => {
      let point = {
        label: event.game_name,
        x: event.start_time,
        y: (event.stop_time - event.start_time) / 3600000
      }
      points.push(point);
    });

    return (
      <div className="chart">
        <Line
          data={{
            datasets: [{
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              pointBackgroundColor: "rgba(255, 206, 86, 1)",
              data: points,
              tension: 0
            }]
          }}
          options={{
            responsive: true,
            scales: {
              xAxes: [{
                type: "time",
              }],
            },
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: (tooltipItem, data) => {
                  var allData = data.datasets[tooltipItem.datasetIndex].data;
                  var tooltipLabel = allData[tooltipItem.index].label;
                  var hours = allData[tooltipItem.index].y;
                  return `${tooltipLabel}: ${hours.toFixed(2)} hours`;
                }
              }
            }
          }}
        />
      </div>
    );
  }
}

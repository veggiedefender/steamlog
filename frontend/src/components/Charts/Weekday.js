import React, { Component } from "react";
import {HorizontalBar} from "react-chartjs-2";

export default class Weekday extends Component {
  render() {
    let points = this.props.events.reduce((totals, event) => {
      let elapsed = (event.stop_time - event.start_time) / 3600000;
      totals[event.start_time.getDay()] += elapsed;
      return totals;
    }, [0,0,0,0,0,0,0]);

    const data = {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [{
        data: points,
        backgroundColor: "#FF6384"
      }]
    }

    return (
      <div className="chart">
        <HorizontalBar
          width={100}
          height={100}
          data={data}
          options={{
            responsive: true,
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: (tooltipItem, data) => {
                  console.log("fuck");
                  var allData = data.datasets[tooltipItem.datasetIndex].data;
                  var hours = allData[tooltipItem.index];
                  return `${hours.toFixed(2)} hours`;
                }
              }
            },
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true,
                  min: 0
                }
              }]
            }
          }}
        />
      </div>
    );
  }
}

import React, { Component } from "react";
import {Radar} from "react-chartjs-2";


export default class Genres extends Component {
  render() {
    let breakdown = this.props.events.reduce((genres, event) => {
      let elapsed = (event.stop_time - event.start_time) / 3600000;
      if (event.genres.length === 0) {
        genres.Other += elapsed;
      } else {
        event.genres.forEach((genre) => {
          if (event.game_name in genres) {
            genres[genre] += elapsed;
          } else {
            genres[genre] = elapsed;
          }
        });
      }
      return genres;
    }, {Other: 0});

    const data = {
      labels: [],
      datasets: [{
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#36A2EB",
        pointBackgroundColor: "#36A2EB",
        data: []
      }]
    }

    for (let genre in breakdown) {
      data.labels.push(genre);
      data.datasets[0].data.push(breakdown[genre]);
    }

    return (
      <div className="chart">
        <Radar
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
                  var allData = data.datasets[tooltipItem.datasetIndex].data;
                  var hours = allData[tooltipItem.index];
                  return `${hours.toFixed(2)} hours`;
                }
              }
            }
          }}
        />
      </div>
    );
  }
}
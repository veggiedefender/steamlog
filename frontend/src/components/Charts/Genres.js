import React, { Component } from "react";
import {Bar} from "react-chartjs-2";


export default class Genres extends Component {
  render() {
    let breakdown = this.props.events.reduce((genres, event) => {
      let elapsed = (event.stop_time - event.start_time) / 3600000;
      event.genres.forEach((genre) => {
        if (genre in genres) {
          genres[genre] += elapsed;
        } else {
          genres[genre] = elapsed;
        }
      });
      return genres;
    }, {});

    let genres = [];
    for (let genre in breakdown) {
      genres.push({
        genre: genre,
        time: breakdown[genre],
      });
    }
    breakdown = genres.sort((a, b) => b.time - a.time);

    const data = {
      labels: [],
      datasets: [{
        backgroundColor: "#36A2EB",
        data: []
      }]
    }

    breakdown.forEach((genre) => {
      data.labels.push(genre.genre);
      data.datasets[0].data.push(genre.time);
    });

    return (
      <div className="chart">
        <Bar
          width={100}
          height={50}
          data={data}
          options={{
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                ticks: {
                  autoSkip: false
                }
              }]
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
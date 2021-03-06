import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

export default class PieChart extends Component {
  render() {
    let breakdown = this.props.events.reduce((totals, event) => {
      let elapsed = (event.stop_time - event.start_time) / 3600000;
      if (event.game_name in totals) {
        totals[event.game_name] += elapsed;
      } else {
        totals[event.game_name] = elapsed;
      }
      return totals;
    }, {});

    let data = [];
    for (let game_name in breakdown) {
      data.push({
        game_name: game_name,
        time: breakdown[game_name],
      });
    }
    data = data.sort((a, b) => b.time - a.time).slice(0, 10);

    let points = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ]
      }]
    }

    data.forEach((point) => {
      points.labels.push(point.game_name);
      points.datasets[0].data.push(point.time);
    });
    return (
      <div className="chart">
        <Pie
          width={100}
          height={100}
          data={points}
          options={{
            cutoutPercentage: 45,
            responsive: true,
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: (tooltipItem, data) => {
                  var allData = data.datasets[tooltipItem.datasetIndex].data;
                  var tooltipLabel = data.labels[tooltipItem.index];
                  var hours = allData[tooltipItem.index];
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

import React, { Component } from "react";
import Chart from "chart.js";

export default class PieChart extends Component {
  render() {
    if (this.props.events.length > 0) {
      let breakdown = this.props.events.reduce((totals, event) => {
        let elapsed = (event.stop_time - event.start_time)
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
      const ctx = document.getElementById("pieChart");
      new Chart(ctx, {
        type: "pie",
        data: points,
        options: {
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
                var hours = allData[tooltipItem.index] / 3600000;
                return `${tooltipLabel}: ${hours.toFixed(2)} hours`;
              }
            }
          }
        }
      });
    }
    return (
      <div className="chart">
        <canvas id="pieChart"></canvas>
      </div>
    );
  }
}

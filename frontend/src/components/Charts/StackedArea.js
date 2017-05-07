import React, { Component } from "react";
import {Line} from "react-chartjs-2";
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export default class StackedArea extends Component {
  render() {
    let games = this.props.events.reduce((allGames, event) => {
      let point = {
        x: event.start_time,
        y: (event.stop_time - event.start_time) / 3600000
      };
      if (event.game_name in allGames) {
        allGames[event.game_name].push(point);
      } else {
        allGames[event.game_name] = [point];
      }
      return allGames;
    }, {});

    let data = [];
    for (let game in games) {
      data.push({
        label: game,
        data: games[game],
        tension: 0,
        backgroundColor: getRandomColor()
      })
    }
    return (
      <div className="chart">
        <Line
          data={{
            datasets: data
          }}
          options={{
            scales: {
              xAxes: [{
                type: "time",
              }],
              yAxes: [{
                stacked: true
              }]
            },
            legend: {
              display: false
            },
          }}
        />
      </div>
    );
  }
}

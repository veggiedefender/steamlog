import React, { Component } from "react";
import { VictoryPie } from 'victory';

export default class PieChart extends Component {
  render() {
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
    for (var game_name in breakdown) {
      data.push({
        game_name: game_name,
        time: breakdown[game_name]
      });
    }
  return (
    <VictoryPie
      data={data}
      x="game_name"
      y="time"
    />
    );
  }
}

import React, { Component } from "react";
import {Line} from 'react-chartjs-2';

export default class StackedArea extends Component {
  render() {
    return (
      <div className="chart">
        <Line
          data={{
            datasets: [{
              label: 'one',
              data: [{
                x: -10,
                y: 0
              }, {
                x: 0,
                y: 10
              }, {
                x: 10,
                y: 5
              }]
            },
            {
              label: 'two',
              data: [{
                x: -10,
                y: 0
              }, {
                x: 0,
                y: 10
              }, {
                x: 10,
                y: 5
              }]
            },
            {
              label: 'three',
              data: [{
                x: -10,
                y: 0
              }, {
                x: 0,
                y: 10
              }, {
                x: 10,
                y: 5
              }]
            },
            {
              label: 'four',
              data: [{
                x: -10,
                y: 0
              }, {
                x: 0,
                y: 10
              }, {
                x: 10,
                y: 5
              }]
            }]
          }}
          options={{
            scales: {
              xAxes: [{
                type: 'linear',
                position: 'bottom'
              }],
              yAxes: [{
                  stacked: true
              }]
            }
          }}
        />
      </div>
    );
  }
}

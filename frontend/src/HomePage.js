import React, { Component } from "react";

import "./css/app.css";
import "./css/Card.css";
import "./css/HomePage.css";

import NavBar from "./components/NavBar/NavBar";
import {Bar} from 'react-chartjs-2';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <NavBar />
        <div className="container">
          <div className="bar">
            <Bar
              height={100}
              width={100}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                  display: false
                },
                scales:
                {
                  xAxes: [{
                    display: false
                  }],
                  yAxes: [{
                    display: false,
                    ticks: {
                      beginAtZero: true,
                      min: 0
                    }
                  }]
                },
                tooltips: {
                  enabled: false      
                }
              }}
              data={{
                labels: [0, 1, 2, 3, 4, 5, 6, 7,  8, 9, 10],
                datasets: [{
                  data: [65, 59, 80, 43, 72, 91, 63, 21, 20, 42, 59]
                }]
              }}
            />
          </div>

          <div className="content">
            <h1>QUANTIFY YOUR GAMING HABITS</h1>
            <a className="button" href="/login">GET STARTED</a>
          </div>
        </div>
      </div>
    );
  }
}
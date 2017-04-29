import React, { Component } from "react";
import "../css/Footer.css";


export default class Footer extends Component {
  render() {
    return (
      <footer>
        <p>Created by <a href="https://jli.host/">Jesse Li</a></p>
        <p>
          <a href="https://github.com/veggiedefender/steamlog">Source</a>
          <span>/</span>
          <a href="https://github.com/veggiedefender/steamlog/issues">Feedback</a>
        </p>        
      </footer>
    );
  }
}
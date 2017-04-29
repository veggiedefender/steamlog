import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchResults from "./SearchResults";


export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    }
    this.delay = this.delay.bind(this);
    this.search = this.search.bind(this);
    this.close = this.close.bind(this);
    this.timeout = null;
  }
  componentWillMount() {
    document.addEventListener("click", this.close, false);
  }
  close(e) {
    if(!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.setState({results: []})
    }
  }
  delay(e) {
    e.persist();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.search(e.target.value), 300);
  }
  async search(term) {
    let data = await fetch(`/api/search?q=${term}`);
    data = await data.json();
    this.setState({results: data});
  }
  render() {
    return (
      <div className="search_wrapper">
        <input
          type="text"
          className="search"
          placeholder="Search players"
          onChange={this.delay}
        />
        <SearchResults results={this.state.results} />
      </div>
    );
  }
}

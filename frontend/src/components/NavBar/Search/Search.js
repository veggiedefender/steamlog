import React, { Component } from "react";
import SearchResults from "./SearchResults";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    }
    this.delay = this.delay.bind(this);
    this.search = this.search.bind(this);
    this.timeout = null;
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
        <div
          className="backdrop"
          onClick={() => this.setState({results: []})}>
        </div>
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

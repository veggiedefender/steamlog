import React, { Component } from "react";
import Card from "./Card";

export default class ChartCard extends Component {
	render() {
		return (
			<Card title={this.props.title}>
				{this.props.children}
			</Card>
		);
	}
}
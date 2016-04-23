// timer.js

import React from 'react'

import _ from 'underscore'

class Timer extends React.Component {

	constructor(props) {
		super(props)
		this.timer = {}, this.now = new Date()
	}

	start() {
		console.log(this.now)
	}

	render() {
		let
		hour = this.now.getHours(),
		minute = this.now.getMinutes(),
		second = this.now.getSeconds();

		return (
			<div> {hour} / {minute} / {second} </div>
		)
	}

}

module.exports = Timer
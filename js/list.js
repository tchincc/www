// list.js

import React from 'react'

import _ from 'underscore'

import Models from './models'
import template from '../templates/hot.html'
import baseCSS from '../res/style/base.css'
import indexCSS from '../res/style/index.css'

let HotelModel = new Models.HotModel();

let List = React.createClass({

	getInitialState() {
		return {
			data: ''
		}
	},

	componentWillMount() {
		this.fetch();
	},

	componentDidMount() {
		// console.log(this.state);
	},

	componentWillUpdate() {
		// console.log(this.state);
	},

	componentDidUpdate() {
		// console.log(this.state);		
	},

	componentWillReceiveProps() {
		// console.log(this.props);
	},

	shouldComponentUpdate() {
		return true;
	},

	render() {
		let data = this.state.data;
		let html = _.template(template)({data: data});
		return (
			data ?
			<div dangerouslySetInnerHTML={{__html: html}}></div>
			: <span></span>
		);
	},

	fetch() {
		let t = this;

		HotelModel.setParam({
			"ctyId": "2",
			"pageIdx": 1
		});
		HotelModel.exe().then(data => t.renderList(data));
	},

	renderList(data) {
		// code.. 其他data赋值操作
		data.pageIdx = 1;
		this.setState({data: data});
	}

});

module.exports = List;









// module.js

import React from 'react'
import { Link } from 'react-router'
import css from '../css/base.css'

// component
import List from './list'
import Timer from './timer'

let Home = React.createClass({
	componentDidMount() {
		console.log( this.props )
	},

	getInitialState() {

		return {
			name: '携程旅行网'
		}
	},

	render() {
		let name = this.state.name;
		return (
			<div>
				<ul className="list_wrap">
					<li><Link to={'/list'}>热卖推荐</Link></li>
				</ul>
				<Timer />
			</div>
		);
	}
});

module.exports = Home;
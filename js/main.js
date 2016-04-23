// main.js

import {Router, Route, Link, hashHistory} from 'react-router'
import React from 'react'
import ReactDom from 'react-dom'

// component
let Home = require('./home');
let List = require('./list');

ReactDom.render(
	<Router history={hashHistory}>
		<Route path='/' component={Home}></Route>
		<Route path='/list' component={List}></Route>
	</Router>
, document.getElementById('main'));




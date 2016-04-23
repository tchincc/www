// webpack.config.js

var webpack = require('webpack');

var commonPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {

	plugins: [commonPlugin],

	entry: { 
		main: './js/main.js'
	},

	output: {
		path: 'dist/js',
		filename: '[name].js'
	},

	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['es2015', 'react']}},
			{test: /\.css$/, loaders: ['style-loader', 'css-loader']},
			{test: /\.html$/, loader: 'html-loader'}
		]
	},

	resolve: {
		root: './',
		extensions: ['', '.js'],
		alias: {}
	}
}





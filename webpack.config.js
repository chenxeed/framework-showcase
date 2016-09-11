var webpack = require("webpack");
var path = require("path");
module.exports = {
	context: __dirname,
	entry: "./src/main.js",
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "dist/", // relative path for github pages
		filename: "main.js", // no hash in main.js because index.html is a static page
	},
	module: {
		loaders: [
			{
	          test: /\.(js|jsx)$/,
	          exclude: /(node_modules)/,
	          loader: 'babel' // 'babel-loader' is also a legal name to reference
	        },
			{
	          test: /\.css$/,
	          exclude: /(node_modules)/,
	          loaders: ['style', 'css']
	        },
			{
	          test: /\.html$/,
	          exclude: /(node_modules)/,
	          loaders: ['html']
	        }
		],
	},
	resolve: {
		root: [
	        path.resolve( './src' )
	    ]
	},
	resolveLoader: {
    	root: path.join( __dirname, 'node_modules' )
    },
	amd: { jQuery: true },
	devtool: 'eval'
};
const fs = require('fs');
const path = require( 'path' );
const { CheckerPlugin } = require('awesome-typescript-loader');


const externals = Object.keys(
	JSON.parse(
		fs.readFileSync('package.json')
	).dependencies
)
						
// The configuration for the client-side rendering
const client = {
	entry: './src/client/index.tsx',
	output: {
		path: path.resolve( __dirname, './dist/public/scripts' ),
		filename: '[name].js',
		chunkFilename: 'chunk-[chunkhash].js',
	},
	watchOptions: {
		ignored: '/node_modules/'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test:  /\.ts(x?)$/,
				exclude: /node_modules/,
				use: 'awesome-typescript-loader',
			}, {
				test: /\.less$/,
				use: [
					{
						loader: "style-loader"
					}, {
						loader: "css-loader", options: {
							sourceMap: true
						}
					}, {
						loader: "less-loader", options: {
							sourceMap: true
						}
					}
				]
			}
		],
	},
	resolve: {
		 extensions: ['.ts', '.tsx', 'less', '.js']
	},
	plugins: [
		new CheckerPlugin()
	],
};

// The configuration for the server-side rendering
const server = {
	name: 'server-side rendering',
	entry:  './src/server/index.ts',
	target: 'node',
	output: {
		path: path.resolve( __dirname, './dist/' ),
		filename: 'server.js',
		libraryTarget: "commonjs2"
	},
	externals: externals,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
		]
	}
}

module.exports = [ client, server ]

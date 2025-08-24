const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
require('dotenv').config(); // грузим .env

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js',
		clean: true,
	},
	devtool: isProduction ? 'source-map' : 'eval-source-map',
	mode: isProduction ? 'production' : 'development',
	devServer: {
		host: 'localhost',
		port: 3000,
		hot: true,
		open: true,
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(scss|sass)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css',
			chunkFilename: 'styles.css',
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(
				process.env.NODE_ENV || 'development'
			),
			'process.env.REACT_APP_FIREBASE_API_KEY': JSON.stringify(
				process.env.REACT_APP_FIREBASE_API_KEY
			),
			'process.env.REACT_APP_FIREBASE_AUTH_DOMAIN': JSON.stringify(
				process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
			),
			'process.env.REACT_APP_FIREBASE_PROJECT_ID': JSON.stringify(
				process.env.REACT_APP_FIREBASE_PROJECT_ID
			),
			'process.env.REACT_APP_FIREBASE_STORAGE_BUCKET': JSON.stringify(
				process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
			),
			'process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
				process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
			),
			'process.env.REACT_APP_FIREBASE_APP_ID': JSON.stringify(
				process.env.REACT_APP_FIREBASE_APP_ID
			),
		}),
	],
};

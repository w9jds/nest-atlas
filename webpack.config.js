const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
var plugins = [];

module.exports = {
    context: __dirname,
    mode: NODE_ENV,
    entry: {
        'nest-atlas': ['babel-polyfill', 'isomorphic-fetch', './src/index.tsx']
    },
    optimization: {
        minimize: NODE_ENV !== 'development' ? true : false,
    },
    devtool: NODE_ENV !== 'development' ? false : 'sourcemap',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }),
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loaders: [
                    'url-loader?name=/fonts/[name].[ext]',
                    'file-loader?name=/fonts/[hash].[ext]'
                ]
            },
            {
                test: /\.svg$/,
                loaders: ['babel-loader',
                    {
                        loader: 'react-svg-loader',
                        query: {
                            jsx: true
                        }
                    }
                ]

            },
            {
                test: /\.(jpe?g|png)$/i,
                loaders: ['file-loader?name=/assets/[hash].[ext]']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles/main.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ]),
        new HtmlWebpackPlugin({
            title: 'Nest Atlas',
            filename: 'index.html',
            environment: NODE_ENV,
            template: path.join(__dirname, './template.ejs'),
        }),
        ...plugins
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};

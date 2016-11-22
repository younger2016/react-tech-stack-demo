var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var origin = [
  path.resolve('src/common'),
  path.resolve('src/client'),
]

var config = {
  entry: {
    'index': './src/client/index.jsx',
    //'business-index': './src/client/cube/index.js',
  },
  output: {
    comments: false,
    path: path.join(__dirname, './'),
    filename: 'static/scripts/[name].min.js'
  },
  externals: {
    cb: 'window.cb',
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  module: {
    root: origin,
    modulesDirectories: ['node_modules'],
    loaders: [
      {
        test: /\.js|jsx$/,
        loader: 'babel',
        include: origin,
      }, {
        test: /\.jpg|png|gif$/,
        loader: 'url',
        include: origin,
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", "less-loader"),
        include: origin,
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        include: origin,
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.__CLIENT__': 'true',
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.production.json')
    }),
    new ExtractTextPlugin("static/styles/default/[name].min.css"),
  ]
};

module.exports = config;

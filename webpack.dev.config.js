var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var origin = [
  path.resolve('src/common'),
  path.resolve('src/client'),
]

var manifestFileName = process.env.BABEL_ENV === 'production' ?
  'manifest.production.json' :
  'manifest.development.json'

var config = {
  entry: {
    'index': './src/client/index.jsx',
    //'business-index': './src/client/cube/index.js',
  },
  output: {
    publicPath: 'http://localhost:8082/',
    path: path.join(__dirname, './'),
    filename: 'static/scripts/[name].js'
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
        query: {
          cacheDirectory: true
        }
      }, {
        test: /\.jpg|png|gif$/,
        loader: 'url?limit=8192',
        include: origin,
      }, {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"],
        include: origin,
      }, {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
        include: origin,
      }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      'process.env.__CLIENT__': 'true',
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.development.json')
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    hot: true,
    inline: true,
    port: 8082,
  },
  devtool: 'source-map',
  cache: true,
};

module.exports = config

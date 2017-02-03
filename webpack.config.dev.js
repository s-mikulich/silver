const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: [
      'webpack-hot-middleware/',
      './src/app.js'
    ]
  },

  output: {
    path: path.join(__dirname, 'src/dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: 'cheap-inline-module-source-map',

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'libs',
      filename: 'js/libs.js',
      minChunks: 2
    }),
    new ExtractTextPlugin({
      filename: 'styles/app.css',
      allChunks: true
    })
  ],

  resolve: {
    modules: [
      path.resolve(__dirname, 'src/app'),
      path.resolve(__dirname, 'src/app/redux'),
      path.resolve(__dirname, 'src/assets'),
      'node_modules'
    ],
    extensions: ['.js', '.json', '.jsx', '.scss', '.css']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader!postcss-loader'
        })
      },
      {
        test: /\.woff$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.woff2$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]'
      },
      {
        test: /\.[ot]tf$/,
        loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
      },
      {
        test: /\.eot$/,
        loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=img/[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'file-loader?name=styles/[name].[ext]'
      }
    ]
  }
};

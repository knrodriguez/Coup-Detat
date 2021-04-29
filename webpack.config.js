'use strict'
const path = require('path');

module.exports = {
  entry: './client/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};

// const { resolve } = require('path')

// module.exports = {
//   entry: ['./client/app'],
//   output: {
//     path: __dirname,
//     filename: './public/bundle.js'
//   },
//   mode: 'development',
//   context: __dirname,
//   devtool: 'source-map',
//   resolve: {
//     extensions: ['.js', '.jsx']
//   },
//   module: {
//     rules: [
//       {
//         test: /jsx?$/,
//         loader: 'babel-loader'
//       },
//       {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//           'css-loader'
//         ]
//       }
//     ]
//   }
// }
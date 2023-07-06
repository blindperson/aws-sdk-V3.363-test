const path = require('path');
const webpack = require('webpack');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  target: 'node',
  devtool: 'source-map',
  mode: 'production',
  entry: './index.ts',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules']
  },

  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'lambdas'),
    filename: 'handlers.js'
  },
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new ZipPlugin({
      filename: 'lambdas-cloudos.zip',
      include: ['handlers.js']
    }),
  ],

  externals: {
    'aws-sdk': 'aws-sdk',
    'node:path': 'path',
    'node:fs': 'fs',
    'node:assert': 'assert'
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader'
      }
    ]
  }
};

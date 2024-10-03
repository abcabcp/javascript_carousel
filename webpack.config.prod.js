const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: './js/carousel.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/carousel.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'img', to: path.resolve(__dirname, 'dist/img') },
        { from: 'css', to: path.resolve(__dirname, 'dist/css') }
      ]
    })
  ]
};


const path = require('path');

module.exports =  {
  mode: 'development',
  entry: {
    app: './js/carousel.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/carousel.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
  },
};

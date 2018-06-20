const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/iDownload.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'iDownload.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'iDownload',
    libraryTarget: 'umd'
  }
};

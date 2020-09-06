"use strict"
const path = require(`path`);
const publicDirPath = path.join(__dirname, `public`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: publicDirPath,
  },
  devtool: `source-map`,
  devServer: {
    contentBase: publicDirPath,
    watchContentBase: true,
  },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }
    ]
  },
  plugins: [
    new MomentLocalesPlugin()
  ]
};

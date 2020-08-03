"use strict"
const path = require(`path`);
const publicDirPath = path.join(__dirname, `public`);

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
  }
};

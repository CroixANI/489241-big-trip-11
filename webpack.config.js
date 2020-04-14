const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: {
    app: `./src/main.js`
  },
  devtool: `source-map`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, `public`),
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true
  },
};

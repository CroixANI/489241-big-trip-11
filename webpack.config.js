const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: {
    app: `./src/main.js`
  },
  devtool: `source-map`,
  output: {
    filename: `bundle.js`,
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, `public`),
  },
  devServer: {
    // eslint-disable-next-line no-undef
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true
  },
};

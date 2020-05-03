const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

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
  module: {
    rules: [
      {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],
};

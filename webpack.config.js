var path = require("path");

module.exports = {
  cache: true,
  context: __dirname,
  entry: {
    index: "./src/index"
  },
  output: {
    path: path.join(__dirname, "./build"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ["", ".js"],
    modulesDirectories: ["./src", "node_modules"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: '6to5-loader'
      }
    ]
  }
};

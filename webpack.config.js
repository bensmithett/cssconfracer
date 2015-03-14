var path = require("path");
var webpack = require("webpack");

module.exports = {
  cache: true,
  context: __dirname,
  entry: {
    index: [
      "webpack/hot/dev-server",
      "webpack-dev-server/client?http://localhost:3000",
      "./src/index"
    ]
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./build"),
    publicPath: "/build/"
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
        loaders: ["react-hot", "babel-loader"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

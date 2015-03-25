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
    publicPath: ""
  },
  resolve: {
    extensions: ["", ".js", ".css", ".sass", ".jpg", ".png", ".svg", ".gif"],
    modulesDirectories: ["src", "node_modules"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]
      },
      {
        test: /\.sass$/,
        loaders: [
          "style-loader",
          "css-loader",
          "autoprefixer-loader?browsers=last 2 version",
          "sass-loader?indentedSyntax=sass&includePaths[]=" + path.resolve(__dirname, "./src")
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          "style-loader",
          "css-loader",
          "autoprefixer-loader?browsers=last 2 version",
        ],
      },
      {
        test: /\.(jpg|png|svg|gif|eot|ttf|woff)$/,
        loader: "url-loader",
        query: {
          name: "[path][name].[ext]",
          context: "src",
          limit: "8192",
        }
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

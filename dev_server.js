var webpack = require("webpack");
var WebpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config");

new WebpackDevServer(webpack(config), {
  hot: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}).listen(3000, "localhost", function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log("Listening at http://localhost:3000");
});

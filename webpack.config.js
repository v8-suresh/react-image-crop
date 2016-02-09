var path              = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var buildDate         = (new Date()).getTime();

var loaders = [];

var plugins = [
    new HtmlWebpackPlugin(
        {
            title: 'React Image Cropper',
            template: path.join(__dirname, 'src/index.ejs')
        }
    ),
    new ExtractTextPlugin('dist/main.css?buildDate=' + buildDate)
];

loaders.push({
    test:    /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader:  "babel",
    query: {
        presets: ["react", "es2015"]
    }
});

loaders.push(
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      'style',
      'css!sass'
    )
  }
);

module.exports = {
  entry: {
      javascript: path.join(__dirname, 'src/index.js')
  },
  output: {
      path:     path.join(__dirname),
      filename: 'dist/imageCropperDemo.js?buildDate=' + buildDate
  },
  module: {
      loaders: loaders
  },
  plugins: plugins
};

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const plugins = [];

module.exports = (env = {}) => {
  if (env.production) {
    plugins.push(new CleanWebpackPlugin());
  } else {
    plugins.push(new webpack.ProgressPlugin());
  }
  plugins.push(
    new HtmlWebpackPlugin({
      template: `${path.resolve(__dirname, "src")}/index.html`,
      title: "NoteApp",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      cache: false
    })
  );
  return {
    entry: "./src/index.js",
    mode: env.production ? "production" : "development",
    output: {
      filename: `[name].[hash].min.js`,
      chunkFilename: "[name].[chunkhash].min.js",
      path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: "~",
        automaticNameMaxLength: 30,
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          include: /src/
        }
      ]
    },
    plugins: plugins
  };
};

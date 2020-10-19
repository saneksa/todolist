const path = require("path");
const os = require("os");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const Webpackbar = require("webpackbar");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/**@type any */
const mode = process.env.NODE_ENV;

const isProd = mode === "production";

/**@type webpack.Configuration */
const config = {
  mode,
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: "cache-loader" },
          {
            loader: "thread-loader",
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: os.cpus().length - 1,
              poolTimeout: isProd ? 500 : Infinity,
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "assets", "index.html"),
      buildDir: path.resolve(__dirname, "dist"),
    }),
    new Webpackbar(),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        memoryLimit: 2048,
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    //new ErrorOverlayPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  devtool: isProd ? undefined : "cheap-module-source-map",
};

module.exports = config;

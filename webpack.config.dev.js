const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist/"),
    publicPath: "/",
    filename: "bundle.js",
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
        '@components': path.resolve(__dirname,'src/components'),
        '@containers': path.resolve(__dirname,'src/containers'),
        '@context': path.resolve(__dirname,'src/context'),
        '@routes': path.resolve(__dirname,'src/routes'),
        '@styles': path.resolve(__dirname,'src/styles'),
        '@assets': path.resolve(__dirname,'src/assets'),
    },
    // plugins: [new TsconfigPathsPlugin({
    //     alias: {
    //         '@components': path.resolve(__dirname,'src/components'),
    //         '@containers': path.resolve(__dirname,'src/containers'),
    //         '@context': path.resolve(__dirname,'src/context'),
    //         '@routes': path.resolve(__dirname,'src/routes'),
    //         '@styles': path.resolve(__dirname,'src/styles'),
    //         '@assets': path.resolve(__dirname,'src/assets'),
    //     },
    //     extensions: ['.js', '.jsx', '.json' , '.ts', '.tsx']
    // })],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.html?$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [ 
          MiniCssExtractPlugin.loader, 
          "css-loader",
          "sass-loader", 
        ],
      },
      // {
      //   test: /\.css$/i,
      //   use: [ MiniCssExtractPlugin.loader,  "css-loader"],
      // },
      {
        test: /\.(jpg|png)$/i,
        type: 'asset'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].css",
    }),

    new ImageMinimizerPlugin({
        minimizerOptions: {
            plugins: [
                'optipng', {optimizationLevel:5}
            ]
        }
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3006,
  },
};

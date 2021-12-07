const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "dist/"),
        publicPath: "/",
        filename: "bundle.js",
        sourceMapFilename: "bundle.js.map",
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        // alias: {
        //     "@components": path.resolve(__dirname, "src/components"),
        //     "@containers": path.resolve(__dirname, "src/containers"),
        //     "@context": path.resolve(__dirname, "src/context"),
        //     "@routes": path.resolve(__dirname, "src/routes"),
        //     "@styles": path.resolve(__dirname, "src/styles"),
        //     "@assets": path.resolve(__dirname, "src/assets"),
        // },
    },
    module: {
        rules: [{
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(js)?$/,
                enforce: "pre",
                use: {
                    loader: "source-map-loader",
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
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpg|png)$/i,
                type: "asset",
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
        new CleanWebpackPlugin(),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ["optipng", { optimizationLevel: 5 }]
                ],
            },
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map"
          }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CSSMinimizerPlugin(), new TerserPlugin()],
    },
    devServer: {
        historyApiFallback: true,
        port: 3005,
    },
};
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
    entry: ['./client/index.js'],
    output: {
        path: __dirname,
        filename: './public/bundle.js',
    },
    mode: 'development',
    devtool: "inline-source-map",
    module: {
        rules:[
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: ["style-loader", "css-loader", "sass-loader"],
            // },
            // {
            //     test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            //     loader: "file-loader",
            //     options: {
            //         limit: 10000,
            //     },
            // },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options:{
                    presets: ['@babel/preset-react']
                }
            }
        ]
    },
    // resolve: {
    //     fallback: {
    //         http: require.resolve("stream-http"),
    //     },
    // },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         process: "process/browser",
    //     }),
    //     new NodePolyfillPlugin(),
    // ],
}
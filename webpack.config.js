module.exports = {
    entry: ['./client/index.js'],
    output: {
        path: __dirname,
        filename: './public/bundle.js',
    },
    mode: 'development',
    devtool: "eval-cheap-source-map",
    module: {
        rules:[
            // {
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader"],
            // },
            // {
            //     test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            //     loader: "url-loader",
            //     options: {
            //         limit: 10000,
            //     },
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options:{
                    presets: ['@babel/preset-react']
                }
            }
        ]
    }
}
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    entry: {
        // javascript
        // index: './src/index.js',
        // header: './src/header.js',
        
        // typescript
        index: './src/type-components/index.ts',
        tsScript: './src/type-components/app.ts'

    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        title: 'Development',
        }),
    ],
    
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    // optimization: {
    //     moduleIds: 'hashed',
    //     usedExports: true,
    //     splitChunks: {
    //       chunks: 'all',
    //       cacheGroups: {
    //         vendor: {
    //           test: /[\\/]node_modules[\\/]/,
    //           name: 'vendors',
    //           chunks: 'all',
    //         },
    //       },
    //     },
    //     runtimeChunk: 'single',
        
    // },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            // {
            //     test: /\.html$/i,
            //     loader: 'html-loader',
            // },
            
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
};

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const json5 = require('json5');

module.exports = {
    entry: {
        // app: './src/index.ts',
        app: './src/index.js',
        // another: './src/another-module.js',
        // print: './src/print.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        title: 'Development',
        }),
    ],
    // resolve: {
    //     extensions: [ '.tsx', '.ts', '.js' ],
    // },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    optimization: {
        moduleIds: 'hashed',
        usedExports: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
        runtimeChunk: 'single',
        
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                  // The `injectType`  option can be avoided because it is default behaviour
                  { loader: 'style-loader', options: { injectType: 'styleTag' } },
                  'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    }
};

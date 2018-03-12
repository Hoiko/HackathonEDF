import { join, resolve } from 'path';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { HotModuleReplacementPlugin } from 'webpack';

const APP_DIR = resolve(__dirname, '..', 'public');
const BUILD_DIR = resolve(__dirname, '..', 'src');
const HTML_DIR = resolve(__dirname, '..', 'public');

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        hash: true,
        template: join(HTML_DIR, 'index.template.html'),
    }),
];

export default {
    entry: resolve(BUILD_DIR, 'index.js'),
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: HTML_DIR,
        historyApiFallback: true,
        hot: true,
        inline: true,
        open: false,
        quiet: false,
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader?sourceMap',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    'postcss-loader?sourceMap',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader?sourceMap',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    'postcss-loader?sourceMap',
                    'sass-loader?sourceMap',
                ],
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader',
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'url-loader',
            },
        ],
    },
    plugins,
    output: {
        filename: 'assets/[name].bundle.js',
        path: APP_DIR,
        publicPath: '/',
    },
};

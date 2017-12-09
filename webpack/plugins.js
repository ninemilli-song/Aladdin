const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssInit = require('./postcss');
const proxy = require('../server/webpack-dev-proxy');

const basePlugins = [
    new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true,
        },
    }),

    new webpack.NoEmitOnErrorsPlugin(),
];

const devPlugins = [
    new webpack.HotModuleReplacementPlugin(),

    new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: ['src/styles/*.scss'],
        failOnError: false,
    }),

    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: postcssInit,
            devServer: {
                historyApiFallback: { index: '/' },
                proxy: Object.assign({}, proxy(), { '/api/*': 'http://localhost:3000' }),
            },
        }
    })
];

const prodPlugins = [
    new ExtractTextPlugin({
        filename: '[name]-[chunkhash].css',
        disable: false,
        allChunks: true,
    }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            unused: true,
            dead_code: true,
            warnings: false
        }
    }),

    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: postcssInit
        }
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
    })

];

module.exports = basePlugins
    .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
    .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

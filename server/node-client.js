/* eslint-disable prefer-arrow-callback */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const proxy = require('./webpack-dev-proxy');
const config = require('../webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: proxy(),
}).listen(3001, function cb(err) {
    if (err) {
        throw err;
    }

    console.log('Listening at http://localhost:3001/');
});

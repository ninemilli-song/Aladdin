/* eslint-disable prefer-arrow-callback */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const proxy = require('./webpack-dev-proxy');
const config = require('../webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    proxy: proxy(),
    historyApiFallback: { 
        index: '/',                         // Overwrite index path
        rewrites: [
            {
                from: /.*/g,
                to: '/index.html'
            },
            {
                from: /\/signin/,           // Match the signin path to the signin.html page
                to: '/signin.html'
            }
        ]
    },
}).listen(3001, function cb(err) {
    if (err) {
        throw err;
    }

    console.log('Listening at http://localhost:3001/');
});

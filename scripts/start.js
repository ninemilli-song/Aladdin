/* eslint-disable prefer-arrow-callback */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const proxy = require('./webpack-dev-proxy');
const config = require('../webpack.config');
const port = process.env.PORT;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    proxy: proxy(),
    historyApiFallback: { 
        index: '/',                         // Overwrite index path
        rewrites: [
            {
                from: /\/signin/,           // Match the signin path to the signin.html page
                to: '/signin.html'
            }
        ]
    },
}).listen(port, function cb(err) {
    if (err) {
        throw err;
    }

    console.log(`Listening at http://localhost:${port}/`);
});

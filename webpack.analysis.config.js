const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const ROOT_PATH = path.join(path.resolve(__dirname), './');
const resolve = file => path.resolve(ROOT_PATH, file);

const baseAppEntries = ['./src/index.tsx'];

const appEntries = baseAppEntries;

// FIXME: change next line if you don't want publish to gh-pages
const publicPath = process.env.PUBLIC_PATH === 'gh' ?
    '/typescript-react-redux-starter/' : './';

const vendor = [
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-thunk',
    'redux-localstorage',
    'immutable',
    'whatwg-fetch',
    'antd',
];
module.exports = {
    entry: {
        app: appEntries,
        vendor,
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath,
        sourceMapFilename: '[name].[hash].js.map',
        chunkFilename: '[id].chunk.js',
    },

    resolveLoader: { root: resolve('./node_modules') },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.webpack.js', '.web.js', '.tsx', '.ts', '.js']
    },

    plugins: plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8889,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
    })),

    module: {
        preLoaders: [
            loaders.tslint,
        ],
        loaders: [
            loaders.tsx,
            loaders.html,
            loaders.scss,
            loaders.css,
            loaders.less,
            loaders.svg,
            loaders.image,
            loaders.eot,
            loaders.woff,
            loaders.woff2,
            loaders.ttf,
        ],
    }
};

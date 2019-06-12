const path = require('path');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ROOT_PATH = path.join(path.resolve(__dirname), './');
const resolve = file => path.resolve(ROOT_PATH, file);

// 知识问答入口文件
const baseAppEntries = ['./src/templete/index.tsx'];
const devAppEntries = [
    'webpack-dev-server/client?http://localhost:3001', // WebpackDevServer host and port
    'webpack/hot/dev-server',                          // "only" prevents reload on syntax errors]
];
const appEntries = baseAppEntries
    .concat(process.env.NODE_ENV === 'development' ? devAppEntries : []);

// // FIXME: change next line if you don't want publish to gh-pages
// const publicPath = process.env.PUBLIC_PATH === 'gh' ?
//     '/typescript-react-redux-starter/' : '/';

const publicPath = process.env.NODE_ENV === 'development' ?
    '/' : './';

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
    'showdown',
    'braft-editor'
];

process.traceDeprecation = true;

module.exports = {
    entry: {
        app: appEntries,                    // 应用入口文件
        vendor,                             // 公共文件
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: process.env.NODE_ENV === 'production' ? 
            '[name].[chunkhash:8].js' : '[name].[hash].js',
        publicPath,
        sourceMapFilename: process.env.NODE_ENV === 'production' ? 
            '[name].[chunkhash:8].js.map' : '[name].[hash].js.map',
        chunkFilename: process.env.NODE_ENV === 'production' ? 
            '[name].[chunkhash:8].chunk.js' : '[id].[hash].chunk.js',
    },

    devtool: 'eval',

    // resolveLoader: { root: resolve('./node_modules') },

    resolve: {
        modules: [resolve('./node_modules')],
        extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js', 'scss']
    },

    resolveLoader: {
        modules: [resolve('./node_modules')]
    },

    plugins: process.env.BUILD_MODE === 'analysis' ? 
        plugins.concat([new BundleAnalyzerPlugin()]) : plugins,

    module: {
        // preLoaders: [
        //     loaders.tslint,
        // ],
        rules: [
            loaders.tslint,
            loaders.tsx,
            loaders.html,
            loaders.scss,
            loaders.css,
            // loaders.less,
            loaders.svg,
            loaders.image,
            loaders.eot,
            loaders.woff,
            loaders.woff2,
            loaders.ttf,
        ],
    }
};

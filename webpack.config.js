const path = require('path');
const proxy = require('./server/webpack-dev-proxy');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const postcssInit = require('./webpack/postcss');
const ROOT_PATH = path.join(path.resolve(__dirname), './');
const resolve = file => path.resolve(ROOT_PATH, file);

const baseAppEntries = ['./src/index.tsx'];
const devAppEntries = [
    'webpack-dev-server/client?http://localhost:3001', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors]
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
    'whatwg-fetch',
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

    devtool: 'eval',

    resolveLoader: { root: resolve('./node_modules') },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.webpack.js', '.web.js', '.tsx', '.ts', '.js']
    },

    plugins,

    devServer: {
        historyApiFallback: { index: '/' },
        proxy: Object.assign({}, proxy(), { '/api/*': 'http://localhost:3000' }),
    },

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
    },

    postcss: postcssInit,
};

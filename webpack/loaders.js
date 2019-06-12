const path = require('path');
const sources = path.resolve('./src');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.tslint = {
    test: /\.tsx?$/,
    enforce: 'pre',
    use: [
        { loader: 'tslint-loader' },
    ],
    include: [
        sources,
    ],
};

exports.tsx = {
    test: /\.(tsx|ts)?$/,
    use: [
        { 
            loader: 'react-hot-loader/webpack' 
        },
        {
            loader: 'awesome-typescript-loader'
        }
    ],
    include: [
        sources,
    ],
};

exports.html = {
    test: /\.html$/,
    use: [
        {
            loader: 'raw-loader'
        }
    ],
    include: [
        sources,
    ],
};

exports.css = {
    test: /\.css$/,
    // loader: process.env.NODE_ENV === 'development' ?
    //     'style-loader!css-loader!postcss-loader!sass-loader' :
    //     ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
    use: process.env.NODE_ENV === 'development' ? [
        {
            loader: 'style-loader'                
        },
        {
            loader: 'css-loader'
        },
        {
            loader: 'postcss-loader'
        },
        {
            loader: 'sass-loader'
        }
    ] : ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'sass-loader']
    }),
};

// exports.less = {
//     test: /\.less$/,
//     loader: process.env.NODE_ENV === 'development' ?
//         'style-loader!css-loader!postcss-loader!less-loader' :
//         ExtractTextPlugin.extract({
//             fallback: 'style-loader',
//             use: ['css-loader', 'postcss-loader', 'less-loader']
//         }),
// };

exports.scss = {
    test: /\.scss$/,
    use: process.env.NODE_ENV === 'development' ? [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader',
            options: {
                // If you are having trouble with urls not resolving add this setting.
                // See https://github.com/webpack-contrib/css-loader#url
                url: false,
                minimize: true,
                sourceMap: true
            }
        }, 
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true
            }
        }, 
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }
    ] : ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'sass-loader']
    }),
    exclude: /node_modules/,
};

function makeUrlLoader(pattern) {
    return {
        test: pattern,
        loader: 'url-loader',
        exclude: /node_modules/,
    };
}
exports.image = makeUrlLoader(/\.(png|jpg)$/);
exports.svg = makeUrlLoader(/\.svg$/);
exports.eot = makeUrlLoader(/\.eot$/);
exports.woff = makeUrlLoader(/\.woff$/);
exports.woff2 = makeUrlLoader(/\.woff2$/);
exports.ttf = makeUrlLoader(/\.ttf$/);

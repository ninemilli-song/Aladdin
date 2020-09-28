const path = require('path');
const sources = path.resolve('./src');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    ] : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
};

exports.less = {
    test: /\.less$/,
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
            loader: 'less-loader',
            options: {
                sourceMap: true,
                lessOptions: {
                    javascriptEnabled: true,
                }
            }
        }
    ] : [
        MiniCssExtractPlugin.loader, 
        'css-loader', 
        'postcss-loader', 
        {
            loader: 'less-loader',
            options: {
                sourceMap: true,
                lessOptions: {  // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                    javascriptEnabled: true,
                }
            }
        }
    ],
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

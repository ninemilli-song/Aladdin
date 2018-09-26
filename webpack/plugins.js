const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssInit = require('./postcss');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const basePlugins = [
    new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    // 应用页面
    new HtmlWebpackPlugin({                     // 根据模板插入css/js等生成最终HTML
        title: 'Home',                          // html 标题
        // favicon: './src/img/favicon.ico',       // favicon路径，通过webpack引入同时可以生成hash值
        template: './src/index.html',           // html 模板路径
        inject: 'body',                         // js插入的位置，true/'head'/'body'/false
        hash: true,                             // 为静态资源生成hash值
        chunks: ['app', 'vendor'],              // 需要引入的chunk，不配置就会引入所有页面的资源
        minify: {                               // 压缩HTML文件
            removeComments: true,               // 移除HTML中的注释
            collapseWhitespace: true,           // 删除空白符与换行符
        },
    }),

    // 用户登陆页面
    new HtmlWebpackPlugin({
        title: 'Sigin page',                    // html 标题
        // favicon: './src/img/favicon.ico',       // favicon路径，通过webpack引入同时可以生成hash值
        template: './src/templete/signin.html', // html 模板路径
        filename: 'signin.html',                // 生成的html存放路径，相对于path
        inject: 'body',                         // js插入的位置，true/'head'/'body'/false
        hash: true,                             // 为静态资源生成hash值
        chunks: ['signin'],                     // 需要引入的chunk，不配置就会引入所有页面的资源
        minify: {                               // 压缩HTML文件
            removeComments: true,               // 移除HTML中的注释
            collapseWhitespace: true,           // 删除空白符与换行符
        },
    }),

    new webpack.NoEmitOnErrorsPlugin(),
];

const devPlugins = [
    new webpack.HotModuleReplacementPlugin(),   // 热加载

    new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: ['src/styles/*.scss'],
        failOnError: false,
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

    // new BundleAnalyzerPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
    })

];

module.exports = basePlugins
    .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
    .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

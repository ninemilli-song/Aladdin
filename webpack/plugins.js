const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePlugins = [
    new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    // 首页
    new HtmlWebpackPlugin({
        title: '首页',                              // html 标题
        // favicon: './src/img/favicon.ico',       // favicon路径，通过webpack引入同时可以生成hash值
        template: './src/index.html',               // html 模板路径
        filename: 'index.html',                     // 生成的html存放路径，相对于path
        inject: 'body',                             // js插入的位置，true/'head'/'body'/false
        hash: true,                                 // 为静态资源生成hash值
        chunksSortMode: 'manual',
        chunks: ['manifest', 'vendor', 'app'],     // 需要引入的chunk，不配置就会引入所有页面的资源
        minify: {                                   // 压缩HTML文件
            removeComments: true,                   // 移除HTML中的注释
            collapseWhitespace: true,               // 删除空白符与换行符
        },
    }),

    new webpack.HashedModuleIdsPlugin(),
];

const devPlugins = [
    /**
     * 模块热替换
     * 该插件的作用就是实现模块热替换，实际上当启动时带上 `--hot` 参数，会注入该插件，生成 .hot-update.json 文件。
     */
    new webpack.HotModuleReplacementPlugin(),

    new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: ['src/styles/*.less'],
        failOnError: false,
    })
];

const prodPlugins = [
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),

    new webpack.LoaderOptionsPlugin({
        options: {
            // postcss: postcssInit
        }
    }),

    new webpack.optimize.OccurrenceOrderPlugin()

];

module.exports = basePlugins
    .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
    .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

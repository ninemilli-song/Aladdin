const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const AntDesignThemePluginOptions = {
    antDir: path.join(__dirname, '../node_modules/antd'), // antd包位置
    stylesDir: path.join(__dirname, '../src/styles/theme'), // 指定皮肤文件夹
    varFile: path.join(__dirname, '../src/styles/theme/variables.less'), // 自己设置默认的主题色
    indexFileName: '../index.html',
    mainLessFile: path.join(__dirname, '../src/styles/theme/index.less'),
    outputFilePath: path.join(__dirname, '../color.less'), // 输出到什么地方
    javascriptEnabled: true,
    themeVariables: [ // 这里写要改变的主题变量
        '@primary-color',
        '@secondary-color',
        '@text-color',
        '@text-color-secondary',
        '@heading-color',
        '@layout-body-background',
        '@btn-primary-bg',
        '@layout-header-background',
        '@btn-border-radius-base'
    ],
    generateOnce: false
};

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

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.HashedModuleIdsPlugin(),

    new AntDesignThemePlugin(AntDesignThemePluginOptions),
];

const devPlugins = [
    /**
     * 模块热替换
     * 该插件的作用就是实现模块热替换，实际上当启动时带上 `--hot` 参数，会注入该插件，生成 .hot-update.json 文件。
     */
    new webpack.HotModuleReplacementPlugin(),

    new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: ['src/styles/*.scss'],
        failOnError: false,
    })
];

const prodPlugins = [
    // new ExtractTextPlugin({
    //     filename: '[name]-[chunkhash].css',
    //     disable: false,
    //     allChunks: true,
    // }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),

    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         unused: true,
    //         dead_code: true,
    //         warnings: false
    //     }
    // }),

    new webpack.LoaderOptionsPlugin({
        options: {
            // postcss: postcssInit
        }
    }),

    // // 告诉 Webpack 使用了哪些动态链接库
    // new DllReferencePlugin({
    //     // 描述 react 动态链接库的文件内容
    //     manifest: require('../dist/antd.manifest.json'),
    // }),
    // new DllReferencePlugin({
    //     // 描述 polyfill 动态链接库的文件内容
    //     manifest: require('../dist/polyfill.manifest.json'),
    // }),
    // new DllReferencePlugin({
    //     // 描述 polyfill 动态链接库的文件内容
    //     manifest: require('../dist/react.manifest.json'),
    // }),
    // new DllReferencePlugin({
    //     // 描述 polyfill 动态链接库的文件内容
    //     manifest: require('../dist/redux.manifest.json'),
    // }),

    new webpack.optimize.OccurrenceOrderPlugin()

];

module.exports = basePlugins
    .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
    .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

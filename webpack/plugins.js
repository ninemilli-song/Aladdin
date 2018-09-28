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
        chunks: ['app', 'vendor', 'manifest'],  // 需要引入的chunk，不配置就会引入所有页面的资源
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
        chunks: ['signin', 'manifest'],         // 需要引入的chunk，不配置就会引入所有页面的资源
        minify: {                               // 压缩HTML文件
            removeComments: true,               // 移除HTML中的注释
            collapseWhitespace: true,           // 删除空白符与换行符
        },
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.HashedModuleIdsPlugin(),

    /**
     * 将公共类库打包为vendor
     * 保证其它chunk中不会重复引用vendor中的类库
     * 这里没有设置chunks, 将会使用所有chunks
     */
    new webpack.optimize.CommonsChunkPlugin({
        // name 可以是已经存在的 chunk 的 name （一般是入口文件），
        // 那么共用模块代码会合并到这个已存在的 chunk；否则，创建名字为 name 的 commons chunk 来合并。
        name: 'vendor',
        // 1. 设定为数字（大于等于2），指定共用模块被多少个 chunk 使用才能被合并。
        // 2. 也可以设为函数，接受 (module, count) 两个参数，用法如上。
        // 3. 特别地，还可以设置为 Infinity ，即创建 commons chunk 但不合并任何共用模块。这时一般搭配 entry 的配置一起用：
        minChunks: Infinity,
    }),

    /**
     * 额外的异步 公共chunk
     * 将所有chunks中子chunks的重复引用，合并到common chunk中
     * 这里提取的是antd
     */
    new webpack.optimize.CommonsChunkPlugin({
        // name 可以是已经存在的 chunk 的 name （一般是入口文件），
        // 那么共用模块代码会合并到这个已存在的 chunk；否则，创建名字为 name 的 commons chunk 来合并。
        async: 'antd',
        children: true,
        // 1. 设定为数字（大于等于2），指定共用模块被多少个 chunk 使用才能被合并。
        // 2. 也可以设为函数，接受 (module, count) 两个参数，用法如上。
        // 3. 特别地，还可以设置为 Infinity ，即创建 commons chunk 但不合并任何共用模块。这时一般搭配 entry 的配置一起用：
        minChunks: (module) => {
            const context = module.context;
            return context && 
                (/node_modules\/antd/.test(context) || /node_modules\/rc/.test(context));
        },
    }),

    /**
     * 》》》》》前端缓存》》》》》
     * 解决 chunkhash 每次编译都会发生变化的问题
     * 原因如如下：
     * webpack 有个已知问题：
     * webpack 自身的 boilerplate 和 manifest 代码可能在每次编译时都会变化。
     * 这导致我们只是在 入口文件 改了一行代码，但编译出的 vendor 和 entry chunk 都变了，因为它们自身都包含这部分代码。
     */
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    })
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

    new webpack.optimize.OccurrenceOrderPlugin()

];

module.exports = basePlugins
    .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
    .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

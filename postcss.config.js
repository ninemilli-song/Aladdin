// PostCSS 配置文件，PostCSS 启动时会默认读取此文件中的配置
module.exports = ({ file, env }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
        'postcss-cssnext': {},
        'cssnano': env === 'production' ? {
            safe: true,
            sourcemap: true,
            autoprefixer: false,
        } : false
    }
});

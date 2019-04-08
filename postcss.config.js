module.exports = ({ file, env }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
        'postcss-cssnext': {},
        'autoprefixer': {},
        'cssnano': env === 'production' ? {
            safe: true,
            sourcemap: true,
            autoprefixer: false,
        } : false
    }
});

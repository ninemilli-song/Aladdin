const proxy = require('http-proxy-middleware');
const winston = require('winston');
const proxyConfig = require('./proxy-config');
const c2k = require('koa2-connect');

/*
 * Installs routes that proxy based on the settings in ./proxy-config.
 * If no settings are provided, no proxies are installed.
 */
module.exports = (router) => {
    const paths = Object.keys(proxyConfig);
    if (!paths.length) {
        return;
    }

    paths.forEach(path => {
        const config = proxyConfig[path];

        if (path && config) {
            winston.info(`Enabling proxy ${path} => `, config);
            router.use(path, c2k(proxy(config)));
        }
    });
};

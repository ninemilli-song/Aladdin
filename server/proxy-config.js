// Proxying to remote HTTP APIs:
//
// Proxy settings in this file are used by both the production express server
// and webpack-dev-server.
//
// In either case, the config format is that used by node-http-proxy:
// https://github.com/nodejitsu/node-http-proxy#options
//
// Note that in production it's better to either
// 1. deploy the app on the same domain as the API,
// 2. get the API to expose an x-allow-origin header, or
// 3. use a dedicated reverse proxy (e.g. Nginx) to do this instead.

module.exports = {
    // Calls to /api/foo will get routed to
    // http://jsonplaceholder.typicode.com/foo.
    '/proxy-api/': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
    },
    '/(api|auth)/*': {
        target: 'http://127.0.0.1:9000/',
        // target: 'http://rap2api.taobao.org/app/mock/485/',
        changeOrigin: true
    }
};

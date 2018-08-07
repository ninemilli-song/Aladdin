/**
 * node 层透传cookie
 * 1. 将前端的cookie透传给java
 * 2. 将java服务的cookie发送给你前端
 */
const fetch = require('../lib/fetch');
// const cookie = require('cookie');

const fetchHandler = (ctx, next) => {
    // 将java返回的cookie发送给前端
    /* eslint-disable */
    const captureServerCookie = (res) => {
        console.log('I get cookie from java ===> : ', res.headers.get('set-cookie'));
        // const headers = res.headers.raw();
        /**
         * 获取请求响应中的cookie
         * [ 
         * 'ACCSESSIONID=d12da4fa-be30-4706-8a00-58b9767098d4; Path=/; Max-Age=180000; Expires=Tue, 07-Aug-2018 06:12:06 GMT; HttpOnly',
         * 'rememberMe=deleteMe; Path=/; Max-Age=0; Expires=Sat, 04-Aug-2018 04:12:06 GMT'
         * 'rememberMe=drFyk2hNRuz/m6AQAfc/hMJ72OnYIP/lcvf24bgxL4WZ2bG67EFnxZo98DLwUFGQB9bluKOEc2HPdeA+bGsXPu+YQ9Awy0tn3d+TAd2sYZ7UrSh5jyzD4NzYe7lzYBFsozKvwFUloOfenQBAngqyIOqsBssFFt20b1/uau2at2A7d7fH1OLwinXaC3QEr1K+IyiHdSjpAIWGmWVdijFnxDWa2bwDSe27DrwgW9dVhz3+yeKbgGBPDb+YUVbIaIAAnD1Rgm6bY/XrkNDsGuDBgbjMZhz1x1VUGig5cqo7y9VD9wS6DH7E0fqLoD3WUY/2VSMg2S0mgUL9UesVX+7Kt2EfjDzA57Z0eYX5sz4yvckFNSrTQ7xITXaWLJQPM4+qYDnIesG26n/SVtYsW1aFNAqImTMj6keA+zOAaUEBEUaNyjzI9pD/6S/1oigUHM9pgmzOarWvT31t3FZHXS6Yb77hDcSHEQXSec2/aXe1fAfaJWeBuIMdC5cNPctf1gu2Q/bZHk88brlTd49y1dfq2g==; Path=/; Max-Age=2592000; Expires=Tue, 04-Sep-2018 04:12:06 GMT; HttpOnly' 
         * ]
         */
        const serverCookies = res.headers.get('set-cookie');
        console.log('serverCookies ===> ', serverCookies);

        ctx.set('set-cookie', serverCookies);

        // const setCookie = (str) => {
        //     const cookieItem = cookie.parse(str);

        //     // 提取cookie中的配置信息
        //     const opts = {};
        //     for(k in cookieItem) {
        //         if (k !== 'ACCSESSIONID' && k !== 'rememberMe') {
        //             opts[k] = cookieItem[k];
        //         }
        //     }

        //     // 设置ctx cookies
        //     const javaCookieKey = cookieItem['ACCSESSIONID'] ? 'ACCSESSIONID' : (cookieItem['rememberMe'] ? 'rememberMe' : '');
        //     if (javaCookieKey) {
        //         ctx.cookies.set(javaCookieKey, cookieItem[javaCookieKey], opts);
        //     }
        // }

        // if (Object.prototype.toString.call(serverCookies) === '[object Array]') {
        //     // 将java cookie传入ctx cookies中
        //     serverCookies.foreach((item) => {
        //         setCookie(item);
        //     });
        // } else {
        //     setCookie(serverCookies);
        // }
    }

    ctx.fetch = {
        get: (path, params) => {
            return fetch.get(path, params, {
                headers: ctx.headers
            });
        },
        post: (path, params) => {
            return fetch.post(path, params, {
                headers: ctx.headers
            })
        }
    };

    return next();
};

module.exports = fetchHandler;

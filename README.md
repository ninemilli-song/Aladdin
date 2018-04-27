# Aladdin toolkit

Aladding toolkit make the build frontend project easy!

## usage

### Dev
```bash
$ npm run dev
```

or

```bash
$ npm run dev:server
$ npm run dev:client
```

### Production

```bash
npm install
npm start
```

### Tests

- [ava](https://github.com/avajs/ava)

#### Single Run
```bash
$ npm run test
```

#### Watch Files
```bash
$ npm run test:watch
```

## Project Structure

|-- src     `the code for front end`
    
    |-- actions             `全局action`

|-- server      `the code for node`
    
    |-- node-client.js      `前端启动文件 The file to start front end`

    |-- node-server-koa.js  `node服务启动文件 The file to start node server`

    |-- webpack-dev-proxy.js    `请求的代理文件 The file to proxy request`

    |-- proxy-config.js     `具体的代理配置 The file of proxy config`

    |-- koa                 `node服务文件目录`

        |-- constant        `定义常量 Define the constant`

        |-- lib             `工具方法`

        |-- model           `业务模型`

        |-- routes          `路由入口`

        |-- app-koa.js      `node服务入口文件，配置各种路由、中间件`

## Documnets and Knowledges

* [项目启动](https://github.com/ninemilli-song/Aladdin/wiki/%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%EF%BC%88Run-Project%EF%BC%89)

* [JWT认证](https://github.com/ninemilli-song/Aladdin/wiki/JWT%E8%AE%A4%E8%AF%81)

#### Connecting to remote APIs

Both the devmode and production servers provide a way to proxy requests to
remote HTTP APIs.  This can be useful for working around CORS issues when
developing your software.

Edit [this file](server/proxy-config.js) to mount such APIs at a given path.

## dependencies

* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [react-router](https://react-guide.github.io/react-router-cn/)
* [react-redux](https://github.com/reactjs/react-redux)
* [typescript](https://www.typescriptlang.org/)
* [webpack](https://webpack.github.io/docs/)
* [sass](http://sass-lang.com/)
* [ant-design](https://ant.design/index-cn)

## TODO

> improve webpack performance

```js
webpack -p //
```

## License

Copyright (c) [ninemilli.song](https://github.com/ninemilli-song)

[MIT License][MIT]

[MIT]: ./LICENSE "Mit License"

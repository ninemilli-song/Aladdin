[![Build Status](https://travis-ci.org/bang88/typescript-react-redux-starter.svg?branch=master)](https://travis-ci.org/bang88/typescript-react-redux-starter)

# TypeScript/Antd/React/Redux Starter

Another react typescript starter kit build with love [ant-design](https://github.com/ant-design/ant-design) 

## npm scripts

### Dev
```bash
$ npm run dev
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

#### Connecting to remote APIs

Both the devmode and production servers provide a way to proxy requests to
remote HTTP APIs.  This can be useful for working around CORS issues when
developing your software.

Edit [this file](server/proxy-config.js) to mount such APIs at a given path.

## TODO

> improve webpack performance

```js
webpack -p // 
```

## Note

> This is a fork repo from [rangle](https://github.com/rangle/typescript-react-redux-starter),I try to add more typings,integrate with antd and let it works. 
 But rewrite most of them under `src/*`, the next will be a complete rebuild

## License

Copyright (c) [bang88](//github.com/bang88)
Copyright (c) 2016 rangle.io

[MIT License][MIT]

[MIT]: ./LICENSE "Mit License"

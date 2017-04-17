# Aladdin toolkit

Aladding toolkit make the build frontend project easy!

## usage

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

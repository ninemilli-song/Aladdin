# Shopping Mall WorkBench



## Introduce

### 启动开发环境 Dev

```bash
$ npm run start
```

### 生产环境构建 Production

```bash
npm run build
```

### 生产环境打包分析

```bash
npm run build:analysis
```

### Tests

- [ava](https://github.com/avajs/ava)

#### Single Run

```bash
$ npm run test
```

## 工程目录 Project Structure
```bash
├── src                     # the code for front end
│   ├── actions             # 全局action
│   ├── components          # 公共组件
│   ├── pages               # 各个路由页面
│   ├── store               # 应用中的 store 相关配置
│   ├── styles              # 全局样式文件
│   ├── utils               # 工具代码
│   ├── reducers            # 全局reducer
│   ├── font                # IconFont
│   ├── pages               # 独立页面文件
│   └── middleware          # promise middleware and so on
├── scripts
│   ├── proxy-config.js         # 具体的代理配置 The file of proxy config
│   ├── start.js                # webpack 开发配置文件
│   └── webpack-dev-proxy.js    # webpack 开发代理
│
├── webpack                 # webpack 相关配置
│   ├── loaders.js          # webpack loader 配置
│   ├── plugins.js          # webpack plugins 配置
│   └── postcss.js          # webpack postcss plugin 配置
├── webpack.config.js       # webpack 配置文件
├── package.json            # npm package.josn
├── tsconfig.json           # 编译.ts .tsx文件，webpace ts-loader配置文件#
├── tslint.json             # ts代码规范检查，webpack tslint-loader配置文件
└── .eslintrc               # 本地代码检查配置文件
```

## Documnets and Knowledges

* [项目启动](https://github.com/ninemilli-song/Aladdin/wiki/%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%EF%BC%88Run-Project%EF%BC%89)

#### Connecting to remote APIs

Both the devmode and production servers provide a way to proxy requests to
remote HTTP APIs.  This can be useful for working around CORS issues when
developing your software.

Edit [this file](server/proxy-config.js) to mount such APIs at a given path.

## 依赖 dependencies

* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [react-router](https://react-guide.github.io/react-router-cn/)
* [react-redux](https://github.com/reactjs/react-redux)
* [typescript](https://www.typescriptlang.org/)
* [webpack](https://webpack.github.io/docs/)
* [sass](http://sass-lang.com/)
* [ant-design](https://ant.design/index-cn)

## 许可 License

Copyright (c) [ninemilli.song](https://github.com/ninemilli-song)

[MIT License][MIT]

[MIT]: ./LICENSE "Mit License"

## 更新日志

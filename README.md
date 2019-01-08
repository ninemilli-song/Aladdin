# Aladdin 商城后台管理 （Aladin Shopping Mall）

### 简介（Introduce）

Aladdin 商品后台管理系统，基于Aladdin架手架开发。

### 技术栈

技术 | 说明 | 网址
--- | --- | ---
React | 前端框架 | [https://reactjs.org/](https://reactjs.org/)
Redux | 前端状态管理框架 | [https://www.redux.org.cn/](https://www.redux.org.cn/)
React-Router | 前端路由框架 | [https://reacttraining.com/react-router/](https://reacttraining.com/react-router/)
React-Redux | 绑定React与Redux | [https://react-redux.js.org/](https://react-redux.js.org/)
Antd | 蚂蚁金服的react ui组件库 | [https://ant.design/docs/react/introduce-cn](https://ant.design/docs/react/introduce-cn)
Webpack | 前端工程构建工具 | [https://webpack.js.org/](https://webpack.js.org/)
ava | 测试框架 | [https://github.com/avajs/ava](https://github.com/avajs/ava)

### 项目启动

```bash
# 运行开发环境
$ npm run start

# 构建生产环境代码
$ npm run build

# 生产环境代码分析
$ npm run build:analysis

# 运行测试
$ npm run test
```

### 工程目录（Project Structure）

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
│   ├── templete            # 页面模板文件
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


### 分支说明

* master - 系统主分支，用于业务相关代码的实现

* scaffold - Aladdin脚手架，用于脚手架相关代码的实现

### 文档 （Documnets and Knowledges）

* [更新日志](https://github.com/ninemilli-song/Aladdin/wiki/Update-log)

* 远程API调用（Connecting to remote APIs）

> Both the devmode and production servers provide a way to proxy requests to
remote HTTP APIs.  This can be useful for working around CORS issues when
developing your software.

> Edit [proxy-config.js](server/proxy-config.js) to mount such APIs at a given path.

### 依赖（dependencies）

* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [react-router](https://react-guide.github.io/react-router-cn/)
* [react-redux](https://github.com/reactjs/react-redux)
* [typescript](https://www.typescriptlang.org/)
* [webpack](https://webpack.github.io/docs/)
* [sass](http://sass-lang.com/)
* [ant-design](https://ant.design/index-cn)

### 许可（License）

Copyright (c) [ninemilli.song](https://github.com/ninemilli-song)

[MIT License][MIT]

[MIT]: ./LICENSE "Mit License"

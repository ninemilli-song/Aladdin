### 1.0.4
`2018-06-14`

* 添加 `normalize.css` 对css重置，提高css兼容性 

### 1.0.3

`2017-04-13`

* Upgrade the `stylelint-webpack-plugin` version to v0.7.0 and the `stylelint-config-standard` version to v16.0.6 to match the `stylelint` v7.0.0.

* Regular the css to fellow the stylelint rules.

### 1.0.2

`2017-04-12`

* Support Sass and Less
* fix bug:

    - Remove `postcss-modules-local-by-default` plugin from /webpack/posscss.js to resolve the problem that the `postcss-modules-local-by-default` plugin cause classname turn to a random code when webpack compile finished.


### 1.0.1

`2017-04-10`

* Upgrade TypeScript version to 2.2.2

* Upgrade Antd version to 2.x

* Fix problems which cause by upgrade TypeScript and Antd

    - Remove typings which create by Typings tools, because TypeScript 2.2.2 support @types/... style and antd dependencies @type/react.

    - Add @types/react in the package.json devDependencies.

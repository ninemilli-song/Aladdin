/* import antd style. you can remove next line if you use babel-plugin-antd */
require('antd/dist/antd.css');

require('../font/iconfont.css');

/* import public variable */
require('./variable.scss');

/* import common class */
require('./common.scss');

/* ******import modules style****** */

/* we need import layout here,it override some antd styles */
require('./layout.scss');

/* @import "./warehouse.less"; */
require('./warehouse.scss');
require('./category.scss');

/* import style of grid */
require('./grid.scss');
require('./components');

require('./init.scss');

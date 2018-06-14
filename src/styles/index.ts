/* Normalize.css is a small CSS file that provides better 
cross-browser consistency in the default styling of HTML elements. 
It’s a modern, HTML5-ready, alternative to the traditional CSS reset.*/
require('./normalize.css');
/* import antd style. you can remove next line if you use babel-plugin-antd */
require('antd/dist/antd.css');

require('../font/iconfont.css');

/* import public variable */
require('./variable.scss');

/* import common class */
require('./common.scss');

/* ******import modules style****** */

/* @import "./warehouse.less"; */
require('./warehouse.scss');
require('./category.scss');

/* import style of grid */
require('./grid.scss');
require('./components');

require('./init.scss');

/**
 * Created by songxg on 16/7/19.
 */
const router = require('koa-router')();
const User = require('../model/user');
const ResponsePacker = require('../lib/responsePacker');

router.get('/', async (ctx) => {
    ctx.state = {
        title: 'register'
    };

//    ctx.body = 'hello register!';
    await ctx.render('index', {});
});

router.post('/', async (ctx) => {
    const user = ctx.request.body.user;

    // check user name
    let result = null;
    console.log('Show User: ', User.prototype);
    await User.getByName(user.name, (u, error) => {
        console.log('Register getByName callback: ', u);
        if (error) {
            ctx.throw('An error occurred when check out user name!');
        }

        if (u) {
            // The user name has duplicated.
            result = ResponsePacker.error('亲，用户名已存在，换个用户名再试试！');
        } else {
            // The user name has not exist, it can be registered.
            if (!user.name) {
                result = ResponsePacker.error('亲，用户名不可为空！');
            } else if (!user.mobile) {
                result = ResponsePacker.error('亲，手机不可为空！');
            } else if (!user.password) {
                result = ResponsePacker.error('亲，密码不可为空！');
            } else {
                // Do register
                const newUser = new User({
                    name: user.name,
                    mobile: user.mobile,
                    password: user.password
                });

                newUser.save();
            }
        }

        console.log('Register getByName callback result ----> : ', result);
    });

    ctx.body = result;
});

module.exports = router;

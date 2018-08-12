/**
 * Created by songxg on 16/7/18.
 */
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const db = mongoose.connect('mongodb://localhost/scm');

// const userSchema = mongoose.Schema({
//     name: String,
//     mobile: String,
//     password: String,
//     passSalt: String
// });

// const UserModel = mongoose.model('User', userSchema);

// function User(obj) {
//     for (const key in obj) {
//         this[key] = obj[key];
//     }
// }

// /**
//  * 判断用户是否有id
//  * 如果有id，调用update方法，用户名索引用户Id,并用对象的属性级装出表中的记录。
//  * 如果没有id,则认为这是一个新用户， 增加user.ids的值，给用户一个唯一的ID,然后再用相同的update()保存用户
//  * @param fn
//  */
// User.prototype.save = function (fn) {
//     const that = this;

//     that.hashPassword((err) => {
//         if (err) return fn(err);
//         that.update(fn);
//     });
// };

// User.prototype.update = function (fn) {
//     console.log('user update enter ');
//     const that = this;

//     UserModel.find({
//         name: that.name,
//         mobile: that.mobile
//     }, (err, user) => {
//         if (err) return fn(err);
//         if (user && user.length > 0) {
//             fn(null, new User(user));
//         } else {
//             console.log('user update enter go save');
//             const u = new UserModel({
//                 name: that.name,
//                 mobile: that.mobile,
//                 password: that.password,
//                 passSalt: that.salt
//             });

//             console.log('user update ', u);

//             u.save((err, u) => {
//                 if (err) return fn(err);
//                 console.log('user save success!', u);
//             });
//         }
//     });
// };

// /**
//  * 密码加盐处理
//  * @param fn
//  */
// User.prototype.hashPassword = function (fn) {
//     console.log('user hashPassword enter ');
//     const that = this;
//     // 加盐处理
//     bcrypt.genSalt(12, (err, salt) => {
//         if (err) return fn(err);
//         console.log('user hashPassword salt ', salt);
//         that.salt = salt;
//         bcrypt.hash(that.password, salt, (err, hash) => {
//             if (err) return fn(err);
//             console.log('user hashPassword generate ', hash);
//             that.password = hash;
//             fn();
//         });
//     });
// };

// /**
//  * 用户认证
//  * @param name
//  * @param pass
//  * @param fn
//  */
// User.authenticate = function (name, pass, fn) {
//     UserModel.find({
//         name
//     }, (err, user) => {
//         if (err) return fn(err);
//         if (user.length == 0) return fn();
//         bcrypt.hash(pass, user.salt, (err, hash) => {
//             if (err) return fn(err);
//             if (hash == user.pass) return fn(null, user);
//             fn();
//         });
//     });
// };

// /**
//  * Get User by Name from MongoDB
//  * @param name
//  * @param fn
//  */
// User.getByName = async function (name, fn) {
//     await UserModel.find({
//         name
//     }, (err, users) => {
//         if (err) {
//             return fn(null, err);
//         }

//         if (users && users.length > 0) {
//             console.log('User --> getByName:', users[0]);
//             const u = new User(users[0]);

//             return fn(u);
//         }        
//         fn(null);
//     });
// };

// module.exports = User;

// var tobi = new User({
//    name: 'ninemilliii',
//    mobile: '12345679823',
//    password: '123456'
// });
//
// tobi.save(function(err) {
//    if (err) console.log('save error ', err);
//    console.log('user save success!');
// });

// const authPassport = require('../lib/auth-passport');
// const fetch = require('../lib/fetch');
const ApiError = require('../error/api-error');
const ApiErrorNames = require('../error/api-error-names');

/**
 * 通过 id 获取用户信息
 */
const findUserById = (userId, ctx) => {
    // return authPassport.readUsers().then((users) => {
    //     const userInfo = users.filter(
    //         (user) => {
    //             return user.id === userId;
    //         }
    //     );

    //     return Object.assign({}, {
    //         ...userInfo[0]
    //     });
    // }).catch((error) => {
    //     throw error;
    // });
    return ctx.fetch.get('sysUser/getUser').then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return data;
    }).catch((error) => {
        throw error;
    });
};

/**
 * 用户登陆
 * @param {*} userName 
 * @param {*} password 
 */
const login = (mobile, password, ctx) => {
    return ctx.fetch.get('sysUser/login', {
        mobile,
        password
    }).then((res) => {
        console.log('user login ----> ', res);
        const { meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return res;
    }).catch((error) => {
        throw error;
    });
};

/**
 * 退出登陆
 */
const logout = (ctx) => {
    return ctx.fetch.post('sysUser/logout').then((res) => {
        const { meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return res;
    }).catch((error) => {
        throw error;
    });
};

module.exports = {
    findUserById,
    login,
    logout
};

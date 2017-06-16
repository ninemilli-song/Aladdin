/**
 * Created by songxg on 16/7/18.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var db = mongoose.connect('mongodb://localhost/scm');

var userSchema = mongoose.Schema({
    name: String,
    mobile: String,
    password: String,
    passSalt: String
});

var UserModel = mongoose.model('User', userSchema);

function User (obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}

/**
 * 判断用户是否有id
 * 如果有id，调用update方法，用户名索引用户Id,并用对象的属性级装出表中的记录。
 * 如果没有id,则认为这是一个新用户， 增加user.ids的值，给用户一个唯一的ID,然后再用相同的update()保存用户
 * @param fn
 */
User.prototype.save = function (fn) {
    var that = this;

    that.hashPassword(function(err) {
        if (err) return fn(err);
        that.update(fn);
    });
}

User.prototype.update = function (fn) {
    console.log('user update enter ');
    var that = this;

    UserModel.find({
        name: that.name,
        mobile: that.mobile
    }, function (err, user) {
        if (err) return fn(err);
        if (user && user.length > 0) {
            fn(null, new User(user));
        }
        else {
            console.log('user update enter go save');
            var u = new UserModel({
                name: that.name,
                mobile: that.mobile,
                password: that.password,
                passSalt: that.salt
            });

            console.log('user update ', u);

            u.save(function(err, u) {
                if (err) return fn(err);
                console.log('user save success!', u);
            });
        }
    });
}

/**
 * 密码加盐处理
 * @param fn
 */
User.prototype.hashPassword = function (fn) {
    console.log('user hashPassword enter ');
    var that = this;
    //加盐处理
    bcrypt.genSalt(12, function(err, salt) {
        if (err) return fn(err);
        console.log('user hashPassword salt ', salt);
        that.salt = salt;
        bcrypt.hash(that.password, salt, function(err, hash) {
            if (err) return fn(err);
            console.log('user hashPassword generate ', hash);
            that.password = hash;
            fn();
        });
    });
}

/**
 * 用户认证
 * @param name
 * @param pass
 * @param fn
 */
User.authenticate = function (name, pass, fn) {
    UserModel.find({
        name: name
    }, function (err, user) {
        if (err) return fn(err);
        if (user.length == 0) return fn();
        bcrypt.hash(pass, user.salt, function (err, hash) {
            if (err) return fn(err);
            if (hash == user.pass) return fn(null, user);
            fn();
        });
    });
}

/**
 * Get User by Name from MongoDB
 * @param name
 * @param fn
 */
User.getByName = async function (name, fn) {
    await UserModel.find({
        name: name
    }, function (err, users) {
        if (err) {
            return fn(null, err);
        }

        if (users && users.length > 0) {
            console.log('User --> getByName:', users[0]);
            let u = new User(users[0]);

            return fn(u);
        }
        else {
            fn(null);
        }
    });
}

module.exports = User;

//var tobi = new User({
//    name: 'ninemilliii',
//    mobile: '12345679823',
//    password: '123456'
//});
//
//tobi.save(function(err) {
//    if (err) console.log('save error ', err);
//    console.log('user save success!');
//});

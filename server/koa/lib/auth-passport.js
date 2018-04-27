const fs = require('fs');
const winston = require('winston');
const denodeify = require('denodeify');
const readFile = denodeify(fs.readFile);

module.exports = {

    readUsers: () => {
        return readFile('./server/koa/constant/users.json')
            .then(userFileData => {
                return JSON.parse(userFileData);
            })
            .catch(err => {
                winston.error(err);
                throw err;
            });
    },

    // Note that we are only authenticating against a static JSON file.
    // this should not be used for any production purpose.
    authenticateUser: (username, password, users) => {
        return new Promise((resolve, reject) => {
            if (username && password) {
                const authorized = users.filter(
                    (user) => {
                        return (user.name === username) && (user.password === password);
                    });
                if (authorized.length > 0) {
                    resolve({
                        data: {
                            msg: 'LOGIN SUCCESSFUL',
                        },
                        meta: {
                            id: authorized[0].id,
                            name: authorized[0].name
                        },
                    });
                } else {
                    reject({ message: 'LOGIN FAILED' });
                }
            } else {
                reject({ message: 'INVALID REQUEST' });
            }
        });
    },

    getUserById: (id, users) => {
        const results = users.filter(
            (user) => {
                return (user.id === id);
            });
        return results.length > 0 ? results[0] : {};
    },

};

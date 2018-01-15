/**
 * The roles model
 */
const ResponsePacker = require('../lib/responsePacker');
const fetch = require('../lib/fetch');

function getRolesTypes(db) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM `RuleType` LIMIT 0,1000', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

const getRolesYears = (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM `RuleYear` LIMIT 0,1000', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const getRolesFilters = (db) => {
    return Promise.all([getRolesTypes(db), getRolesYears(db)]).then(([types, years]) => {
        return ResponsePacker.success({
            types,
            years
        });
    }).catch((error) => {
        return ResponsePacker.error(error);
    });
};

/**
 * Get rules from server
 */
const getRules = () => {
    return fetch.get('accStandard/getDistinctName').then((res) => {
        console.log('👉🏻 ---> accStandard/getDistinctName:\n', res);
        const { data, meta } = res;

        let rules = null;
        if (meta.success) {
            rules = ResponsePacker.success(data);
        } else {
            rules = ResponsePacker.error('remote server result error!');
        }

        return rules;
    }).catch((error) => {
        console.error('👉🏻 ---> accStandard/getDistinctName error:\n', error);
        return ResponsePacker.error(error);
    });
};

/**
 * Find role by typeId and yearId
 * @param {*} db  
 * @param {*} params { typeId: number, yearId: number } 
 */
const findRole = (db, params) => {
    const { typeId, yearId } = params;
    const sql = 'SELECT * FROM `Rule` WHERE `typeId` = ? AND `yearId` = ?';
    const sqlParam = [typeId, yearId];
    console.log('sql query string 👉🏻 ------> ', sql, sqlParam);

    return new Promise((resolve, reject) => {
        db.query(sql, sqlParam, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    }).then((results) => {
        return results[0];
    });
};

/**
 * Find role by type's value and year's value
 * @param {*} db 
 * @param {*} params 
 */
const findRoleByValue = (db, params) => {
    const { type, year } = params;

    // The promise to get roletype's id
    const getRoleTypeIdPms = new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM `RuleType` WHERE `value` = ?';
        const sqlParam = [type];
        db.query(sql, sqlParam, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    }).then((results) => {
        return results[0].id;
    });

    // The Promise to get roleyear's id
    const getRoleYearIdPms = new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM `RuleYear` WHERE `value` = ?';
        const sqlParam = [year];
        db.query(sql, sqlParam, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    }).then((results) => {
        return results[0].id;
    });

    return Promise.all([getRoleTypeIdPms, getRoleYearIdPms]).then(async ([typeId, yearId]) => {
        const result = await findRole(db, {
            typeId,
            yearId,
        });

        if (result) {
            return ResponsePacker.success({
                id: result.id,
                type,
                year,
                content: result.content,
            });
        } 
        return ResponsePacker.error(`can not find role. roleType: ${type}, roleYear: ${year}`);
    }).catch((error) => {
        return ResponsePacker.error(error);
    });
};

/**
 * Add a new role to database
 * @param {*} db 
 * @param {*} params { typeId: number, yearId: number, content: string } 
 */
const addRole = (db, params) => {
    const { typeId, yearId, content } = params;
    const sql = 'INSERT INTO `Rule` (`typeId`, `yearId`, `content`) VALUES (?, ?, ?)';
    const sqlParam = [typeId, yearId, content];
    console.log('sql query string 👉🏻 ------> ', sql);

    return new Promise((resolve, reject) => {
        db.query(sql, sqlParam, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

/**
 * Update the role data
 * @param {*} db 
 * @param {*} params {id: number, content: string}
 */
const updateRole = (db, params) => {
    const { id, content } = params;
    const sql = 'UPDATE Rule SET `content` = ? WHERE `id` = ?';
    const sqlParam = [content, id];
    console.log('sql query string 👉🏻 ------> ', sql, sqlParam);

    return new Promise((resolve, reject) => {
        db.query(sql, sqlParam, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

/**
 * Update the role
 * @param {*} db 
 * @param {*} params { typeId: number, yearId: number, content: string } 
 */
const uploadRole = async (db, params) => {
    const { typeId, yearId, content } = params;

    // Get role
    const role = await findRole(db, {
        typeId,
        yearId
    });

    console.log('find role 👉🏻 ------> ', role);

    let result;

    if (role) {
        // Already exist. Do update
        result = await updateRole(db, {
            id: role.id,
            content,
        });
    } else {
        // Has not exist. Do add
        result = await addRole(db, params);
    }

    return result;
};

module.exports = {
    getRolesFilters,
    uploadRole,
    findRoleByValue,
    getRules
};

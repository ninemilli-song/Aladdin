/**
 * The roles model
 */
const ResponsePacker = require('../lib/responsePacker');

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

    if (role && role.length > 0) {
        // Already exist. Do update
        result = await updateRole(db, {
            id: role[0].id,
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
    uploadRole
};

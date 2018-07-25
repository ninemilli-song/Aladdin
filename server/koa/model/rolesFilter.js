/**
 * The roles filter model
 */
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
        return {
            types,
            years
        };
    }).catch((error) => {
        throw error;
    });
};

module.exports = getRolesFilters;

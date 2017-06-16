/**
 * Created with JetBrains WebStorm.
 * Author: songxg
 * Date: 16/12/2
 * Time: 下午2:24
 */
let messageTpl = {
    success: null,
    error: null,
}

const ResponsePacker = {
    // Pack success result.
    success: (data) => {
        return {
            success: {
                data: data
            },
            error: null,
        }
    },

    // Pack error result.
    error: (msg) => {
        return {
            success: null,
            error: {
                massage: msg,
            },
        }
    }
}

module.exports = ResponsePacker;

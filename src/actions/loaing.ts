// ------------------------------------
// Constants
// ------------------------------------
export const SHOWLOADING = 'SHOWLOADING';

/**
 * 打开 loading
 */
const showLoading = () => {
    return {
        type: SHOWLOADING,
        data: true
    }
}

/**
 * 关闭 loading
 */
const hideLoading = () => {
    return {
        type: SHOWLOADING,
        data: false
    }
}

export {
    showLoading,
    hideLoading
}

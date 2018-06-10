/**
 * Case Reducer
 */
const { fromJS } = require('immutable');

// 选中一个提问
export const onSelectedQ = (state, action) => {
    return state.updateIn(['selectedQId'], data => action.data);
}

// 切换对话框的可见性
export const toggleDetailDialogVisible = (state, action) => {
    return state.updateIn(['uistate', 'qDetailDialogOpts', 'visible'], visible => action.data);
}

// 详情数据加载
export const detailDialogLoading = (state, action) => {
    return state.updateIn(['uistate', 'qDetailDialogOpts', 'loading'], () => action.data);
}

// 切换对话框的可见性
export const fetchDetailData = (state, action) => {
    return state.updateIn(['qDetailData'], data => fromJS(action.data));
}

// 清空对话框中的详情数据
export const clearDetailData = (state, action) => {
    return state.updateIn(['qDetailData'], data => null);
}

// 设置问题回复框的展开状态
export const setQuestionReplyExpand = (state, action) => {
    return state.updateIn(['uistate', 'qDetailDialogOpts', 'replyQuestionExpand'], () => action.data);
}

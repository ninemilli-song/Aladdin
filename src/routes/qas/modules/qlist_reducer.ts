/**
 * Case Reducer
 */
const { fromJS } = require('immutable');

/**
 * 
 * @param state 
 * @param action 
 */
export const setQuestionList = (state, action) => {
    return state.updateIn(['data', 'QList'], data => fromJS(action.data));
}

export const onPageChanged = (state, action) => {
    return state.updateIn(['uistate'], data => {
        return data.updateIn(['currentPage'], d => action.data.pageNum)
            .updateIn(['pageSize'], d => action.data.pageSize);
    });
}

/**
 * 设置问题关注状态
 * @param state 
 * @param action 
 */
export const setQuestionConcern = (state, action) => {
    return state.updateIn(['data', 'QList', 'list'], list => {
        const { data } = action;
        const { id, hasCollected } = data;

        return list.map(item => {
            if (id === item.get('id')) {
                return item.set('hasCollected', hasCollected).update('collectedCount', (count) => {
                    if (hasCollected) {
                        return count + 1;
                    } else {
                        return count - 1;
                    }
                });
            }

            return item;
        });
    })
}

/**
 * 设置回复对话框是否可见
 */
export const setReplyDialogVisible = (state, action) => {
    return state.updateIn(['uistate', 'qReplyDialogOpts', 'visible'], (data) => action.data);
}

/**
 * 新增一个回复
 * @param state 
 * @param action 
 */
export const addReply = (state, action) => {
    return state.updateIn(['data', 'QList', 'list'], list => {
        const { data } = action;

        return list.map(item => {
            if (item.get('id') === data) {
                return item.update('answerCount', (count) => {
                    return count ? count + 1 : 1;
                });
            }

            return item;
        });
    });
}

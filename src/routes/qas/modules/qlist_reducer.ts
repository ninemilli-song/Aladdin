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

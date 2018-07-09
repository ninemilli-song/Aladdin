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
    const { data } = action;
    const { id, hasCollected } = data;

    // 1. 更新问题列表中的 关注状态 和 关注数量
    const newState = state.updateIn(['data', 'QList', 'list'], list => {
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
    });

    // 2. 更新问题详情数据中的 关注状态 和 关注数量
    if (newState.get('qDetailData')) {
        return newState.updateIn(['qDetailData', 'hasCollected'], () => hasCollected)
            .updateIn(['qDetailData', 'collectedCount'], (count) => {
                if (hasCollected) {
                    return count + 1;
                } else {
                    return count - 1;
                }
            }
        );
    }

    return newState;
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

/**
 * 用户汇总数据
 * @param state 
 * @param action 
 */
export const setUserAggregateData = (state, action) => {
    return state.set('myAggregate', action.data);
}

/**
 * 更新 我关注的问题
 * @param state 
 * @param action 
 */
export const setUserAggregateCollectionQuestion = (state, action) => {
    return state.updateIn(['myAggregate', 'myCollectedQuestion'], (count) => {
        const { increase } = action.data;

        if (!count) {
            return increase ? 1 : 0;
        } else {
            return increase ? count + 1 : count - 1;
        }
    });
}

/**
 * 更新 我的收藏
 * @param state 
 * @param action 
 */
export const setUserAggregateCollectionAnswer = (state, action) => {
    return state.updateIn(['myAggregate', 'myCollectedAnswer'], (count) => {
        const { increase } = action.data;

        if (!count) {
            return increase ? 1 : 0;
        } else {
            return increase ? count + 1 : count - 1;
        }
    });
}

/**
 * 更新 我提出的问题
 * @param state 
 * @param action 
 */
export const setUserAggregateMyQuestion = (state, action) => {
    return state.updateIn(['myAggregate', 'myQuestion'], (count) => {
        const { increase } = action.data;

        if (!count) {
            return increase ? 1 : 0;
        } else {
            return increase ? count + 1 : count - 1;
        }
    });
}

/**
 * 设置某条问题展开回答
 * @param state 
 * @param action 
 */
export const setAnswerExpandId = (state, action) => {
    return state.update('qExpandQuestions', data => data.set(action.data, null));
}

/**
 * 设置某条问题展开回答
 * @param state 
 * @param action 
 */
export const cancelAnswerExpandId = (state, action) => {
    return state.update('qExpandQuestions', data => data.delete(action.data));
}

/**
 * 设置某条问题展开回答
 * @param state 
 * @param action 
 */
export const setAnswerReplyExpand = (state, action) => {
    return state.setIn(['uistate', 'qAnswerListOpts', 'expand'], action.data);
}

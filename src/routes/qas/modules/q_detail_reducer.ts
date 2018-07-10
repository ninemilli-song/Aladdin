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
    // return state.updateIn(['qDetailData'], data => fromJS(action.data));
    return state.updateIn(['qExpandQuestions'], 
        questions => questions.update(action.data.id, data => {
            return data.set('data', fromJS(action.data))
        })
    );
}

// 清空对话框中的详情数据
export const clearDetailData = (state, action) => {
    return state.updateIn(['qDetailData'], data => null);
}

// 设置问题回复框的展开状态
export const setQuestionReplyExpand = (state, action) => {
    return state.updateIn(['uistate', 'qDetailDialogOpts', 'replyQuestionExpand'], () => action.data);
}

// 设置回复的收藏状态
export const setAnswerCollected = (state, action) => {
    const { data } = action;
    const { id, hasCollected, questionId } = data;

    return state.update('qExpandQuestions', questionMap => {
        return questionMap.updateIn([questionId, 'data', 'answers'], answers => {
            return answers.map((answer) => {
                if (answer.get('id') === id) {
                    return answer.set('hasCollected', hasCollected);
                }
    
                return answer;
            });
        });
    })
}

// 设置回复的赞成状态
export const setAnswerApprove = (state, action) => {
    const { data } = action;
    const { id, hasApproved, questionId } = data;

    return state.update('qExpandQuestions', questionMap => {
        return questionMap.updateIn([questionId, 'data', 'answers'], answers => {
            return answers.map((answer) => {
                if (answer.get('id') === id) {
                    const alreadyApproved = answer.get('hasApproved');
                    const alreadyDisapproved = answer.get('hasDisapproved');
    
                    return answer.set('hasApproved', hasApproved)
                        .set('hasDisapproved', !hasApproved)
                        .update('approveCount', (count) => {
                            if (hasApproved && !alreadyApproved) {
                                return count + 1;
                            } else {
                                return count ? count - 1 : 0;
                            }
                        })
                        .update('disapproveCount', (count) => {
                            if (hasApproved) {
                                return count ? count - 1 : 0;
                            } else if (!alreadyDisapproved) {
                                return count + 1;
                            }
                        });
                }
    
                return answer;
            });
        })
    })
}

/**
 * 添加Answer reply
 * @param state 
 * @param action 
 */
export const addAnswerReply = (state, action) => {
    const { data } = action;
    const { id, pump, questionId } = data;

    return state.updateIn(['qExpandQuestions', questionId, 'data', 'answers'], answers => {
        return answers.map((answer) => {
            if (answer.get('id') === id) {
                return answer.update('pumps', pumps => {
                    return pumps.insert(0, fromJS(pump));
                })
            }

            return answer;
        })
    });
}

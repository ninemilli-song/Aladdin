import React from 'react';
import { useSubstate } from 'use-substate';

function Dashboard(props) {
    const [substate, dispatch] = useSubstate(state => {
        return state.userInfo;
    });

    const onClick = () => {
        dispatch({
            type: 'CHANGEUSERNAME',
            payload: {
                username: 'bbb'
            }
        });
    };

    return (
        <div>
            404 Not Found
        </div>
    );
}

export default Dashboard
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
            <span>
                { substate.username }
            </span>
            Hello Dashboard!!!
            <div onClick={onClick}>click me change name!</div>
        </div>
    );
}

export default Dashboard;

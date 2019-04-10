import React from 'react';
import { useSubstate } from 'use-substate';

function Dashboard (props) {
    const [substate, dispatch] = useSubstate(state => {
        return state.userInfo;
    })

    return (
        <div>
            Hello Dashboard!!!
        </div>
    )
}

export default Dashboard
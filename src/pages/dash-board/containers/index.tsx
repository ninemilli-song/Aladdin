import React from 'react';
import { useSubstate } from 'use-substate';
import { Button } from 'antd';
import less from 'less';

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

    const switchTheme = () => {
        less.modifyVars({
            '@btn-primary-bg': '#ff8c42',
        })
    }

    return (
        <div>
            <span>
                { substate.username }
            </span>
            Hello Dashboard!!!
            <div onClick={onClick}>click me change name!</div>
            <Button
                type="primary"
                onClick={ switchTheme }
            >
                Primary Button
            </Button>
        </div>
    );
}

export default Dashboard;

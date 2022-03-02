import { useState, useEffect } from 'react';
import ActionItem from './action-item';
import RoutineControlPanel from './routine-control-panel';
import List from '@mui/material/List';
import ActionAddition from './action-addition';

const RoutineContents = (props) => {

    const { action_sequence, actions, update, _delete, run } = props

    const [showAddition, setShowAddition] = useState(false);

    const handleAddAction = (action_name) => {
        action_sequence.push({
            name: action_name,
            param: {}
        });
        setShowAddition(false);
    }

    const renderActions = () => {

        const generateMoveCallback = (index, dir) => () => {
            const swp = (i, j) => {
                const tmp = action_sequence[i];
                action_sequence[i] = action_sequence[j];
                action_sequence[j] = tmp;
            }
            if (dir === 'up') {
                if(index !== 0) {
                    swp(index, index - 1)
                }
            } else {
                if(index !== action_sequence.length - 1) {
                    swp(index, index + 1)
                }
            }
            update();
        }

        const generateDeleteActionCallback = (index) => () => {
            action_sequence.splice(index, 1); //remove this action from the sequence
            update();
        }

        return action_sequence.map((seq_action, index) => {
            const outline = actions.find(action => (seq_action.name === action.name));
            return (<ActionItem 
                key={index} 
                name={seq_action.name} 
                param_outline={outline.param} 
                saved_params={seq_action.param} 
                update={update} 
                _delete={generateDeleteActionCallback(index)} 
                moveUp={generateMoveCallback(index, 'up')}
                moveDown={generateMoveCallback(index, 'down')}
            />);
        });
    };

    let action_items = renderActions();
    
    const handleKeyPress = (event) => { // handle keybinds
        if (event.key === 'a' && event.ctrlKey) {
            setShowAddition(true);
        }
        if (event.key === 'Escape') {
            setShowAddition(false);
        }
        if (event.key === 'Enter') {
            event.target.blur();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, [handleKeyPress]);

    return (
        <List style={{padding: 0}}>
            <RoutineControlPanel _delete={_delete} run={run} add={() => {setShowAddition(true)}} />
            {action_items}
            {showAddition ? (<ActionAddition add={handleAddAction} actions={actions} _delete={() => {setShowAddition(false)}} />) : (<></>)}
        </List>
    );
}

export default RoutineContents;
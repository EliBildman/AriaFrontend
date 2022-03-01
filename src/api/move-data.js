
export const get_actions = () => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/actions`)
        .then(res => res.json());
};

export const get_routines = () => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/routines`)
        .then(res => res.json());
}

export const get_schedlues = () => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/schedule`)
        .then(res => res.json());
}

export const get_scripts = () => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/scripts`)
        .then(res => res.json());
}

export const update_routine = (updated_routine) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/routines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'update',
            ID: updated_routine.ID,
            routine: updated_routine,
        })
    });
}

export const delete_routine = (ID) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/routines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'delete',
            ID
        })
    });
}

export const create_routine = (new_routine) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/routines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'create',
            routine: new_routine,
        })
    });
}

export const run_routine = (ID) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/routines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'run',
            ID
        })
    });
}
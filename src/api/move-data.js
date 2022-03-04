
export const get_actions = () => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/actions`)
        .then(res => res.json());
};

export const get_routines = () => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/routines`)
        .then(res => res.json());
}

export const get_schedules = () => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/schedules`)
        .then(res => res.json());
}

export const get_events = () => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/events`)
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

export const update_event = (updated_event) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'update',
            ID: updated_event.ID,
            event: updated_event,
        })
    });
}

export const update_schedule = (updated_schedule) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/schedules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'update',
            ID: updated_schedule.ID,
            schedule: updated_schedule,
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

export const delete_schedule = (ID) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/schedules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'delete',
            ID
        })
    });
}

export const delete_event = (ID) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'delete',
            ID
        })
    });
}

export const delete_script = (ID) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/scripts`, {
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

export const create_schedule = (new_schedule) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/schedules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'create',
            schedule: new_schedule,
        })
    });
}

export const create_event = (new_event) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'create',
            event: new_event,
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

export const run_event = (ID) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'run',
            ID
        })
    });
}

export const run_script = (ID) => {
    return fetch(`http://${process.env.REACT_APP_API_URL}/scripts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            method: 'run',
            ID
        })
    });
}

export const upload_script = (file) => {
    const formData = new FormData();
    formData.append('script_upload', file);
    return fetch(`http://${process.env.REACT_APP_API_URL}/scripts`, {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: formData 
    });
}
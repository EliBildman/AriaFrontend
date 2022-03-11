import { useEffect, useState } from 'react';
import { TextField, FormControlLabel, Checkbox, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

export const StringInput = (props) => {

    const { autofocus, info, saved_params, update, setUnsaved } = props;

    const [currValue, setCurrValue] = useState(saved_params[info.name]);

    useEffect(() => {
        setCurrValue(saved_params[info.name]);
    }, [saved_params, info.name])

    const handleChange = (value) => {
        setUnsaved(true);
        setCurrValue(value);
    }

    const handleBlur = (value) => {
        if (value === '') {
            delete saved_params[info.name];
        } else {
            saved_params[info.name] = value;
        }
        update();
    }

    return (
        <TextField
            autoFocus={autofocus}
            label={info.name.toUpperCase()}
            required={!info.is_optional}
            value={currValue ?? ''}
            onBlur={(e) => handleBlur(e.target.value)}
            onChange={(e) => handleChange(e.target.value)}
            size='small'
        />
    )
}

export const NumberInput = (props) => {

    const { autofocus, info, saved_params, update, setUnsaved } = props;

    const [currValue, setCurrValue] = useState(saved_params[info.name]);

    useEffect(() => {
        setCurrValue(saved_params[info.name]);
    }, [saved_params, info.name])

    const handleChange = (value) => {
        setUnsaved(true);
        setCurrValue(value);
    }

    const handleBlur = (value) => {
        value = parseFloat(value);
        saved_params[info.name] = value;
        update();
    }

    return (
        <TextField
            autoFocus={autofocus}
            label={info.name.toUpperCase()}
            required={!info.is_optional}
            value={currValue ?? ''}
            type='number'
            onChange={(e) => handleChange(e.target.value)}
            onBlur={(e) => handleBlur(e.target.value)}
            size='small'
        />
    )
}

export const BoolInput = (props) => {

    const { info, saved_params, update } = props;

    const handleUpdate = (value) => {
        saved_params[info.name] = value;
        update();
    }

    if (saved_params[info.name] === undefined) {
        saved_params[info.name] = false;
    }

    return (<FormControlLabel
        control={<Checkbox
            checked={saved_params[info.name]}
        />}
        label={info.name.toUpperCase()}
        onChange={(e) => handleUpdate(e.target.checked)}
    />)
}

export const ChoiceInput = (props) => {

    const { autofocus, info, saved_params, update } = props;

    const [currValue, setCurrValue] = useState(saved_params[info.name]);

    const handleUpdate = (value) => {
        saved_params[info.name] = value;
        setCurrValue(value);
        update();
    }

    const items = info.choices.map((choice, index) => (
        <MenuItem key={index} value={choice}>{choice}</MenuItem>
    ));
    if (info.is_optional) items.unshift((
        <MenuItem key={-1} value=""><em>None</em></MenuItem>
    ));

    return (
        <FormControl sx={{
            m: 1,
            minWidth: (info.name.length * 10 + 50)
        }}>
            <InputLabel>{info.name.toUpperCase()}</InputLabel>
            <Select
                autoFocus={autofocus}
                size="small"
                value={currValue ?? ''}
                label={info.name.toUpperCase()}
                onChange={(e) => handleUpdate(e.target.value)}
                required={!info.is_optional}
            >
                {items}
            </Select>
        </FormControl>
    )

}
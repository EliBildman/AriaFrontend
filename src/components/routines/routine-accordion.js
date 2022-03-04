import { useEffect, useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { get_actions, get_routines, update_routine, delete_routine, create_routine, run_routine } from '../../api/move-data';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import RoutineContents from './routine-contents';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import RoutineAddition from './routine-addition';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const RoutineAccordion = () => {
    const [expanded, setExpanded] = useState(-1);
    const [routines, setRoutines] = useState([]);
    const [routinesLoaded, setRoutinesLoaded] = useState(false);
    const [actions, setActions] = useState([]);
    const [actionsLoaded, setActionsLoaded] = useState(false);
    const [showAddition, setShowAddition] = useState(false);

    const handleChange = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const loadData = () => {
        get_routines().then((_routines) => {
            setRoutines(_routines);
            setRoutinesLoaded(true);
        });
        get_actions().then((_actions) => {
            setActions(_actions);
            setActionsLoaded(true);
        });
    }

    const generateUpdateCallback = (routine) => () => {
        update_routine(routine)
            .then(loadData);
    }

    const generateDeleteCallback = (routine) => () => {
        delete_routine(routine.ID)
            .then(() => {
                loadData();
                setExpanded(-1);
            });
    }

    const generateRunCallback = (routine) => () => {
        run_routine(routine.ID);
    }

    const addRoutineCallback = (name) => {
        create_routine({
            name,
            sequence: [],
        }).then(() => {
            loadData();
            setShowAddition(false);
        });
    }

    const handleKeyPress = useCallback((event) => { // handle keybinds
        if (event.key === 'n' && event.ctrlKey) {
            setShowAddition(true);
        }
        if (event.key === 'Escape') {
            setShowAddition(false);
        }
        if (event.target.nodeName !== 'INPUT' && '1234567890'.includes(event.key)) {
            const num = parseInt(event.key) - 1;
            if (expanded !== num) {
                setExpanded(num);
            }
            else { 
                setExpanded(-1);
            }
        }
    }, [expanded]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, [handleKeyPress]);
    

    useEffect(loadData, []);

    let routine_rows = [];

    if (actionsLoaded && routinesLoaded) {
        routine_rows = routines.map((routine, index) => (
            <Accordion expanded={expanded === index} onChange={handleChange(index)} key={index}>
                <AccordionSummary>
                    <Typography fontWeight='bold'>{routine.name}</Typography>
                    <Typography paddingLeft={1} color='rgba(0, 0, 0, .3)'>ID: {routine.ID}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RoutineContents
                        action_sequence={routine.sequence}
                        actions={actions} update={generateUpdateCallback(routine)}
                        _delete={generateDeleteCallback(routine)}
                        run={generateRunCallback(routine)}
                    />
                </AccordionDetails>
            </Accordion>
        ));

        if (showAddition) routine_rows.push((
            <RoutineAddition key='html is cringe' add={addRoutineCallback} cancel={() => setShowAddition(false)} />
        ))

    }

    return (
        <Box>
            <IconButton color='inherit' onClick={() => { setShowAddition(true) }} style={{ //amazing hack here
                position: 'absolute',
                top: 2,
                right: 8,
            }} >
                <AddCircleIcon fontSize='large' />
            </IconButton>
            {routine_rows}
        </Box>
    );
}

export default RoutineAccordion;
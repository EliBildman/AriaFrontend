import { useEffect, useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { get_routines, get_events, update_event, delete_event, create_event, run_event } from '../../api/move-data';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import EventContents from './event-contents';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import EventAddition from './event-addition';

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

const EventAccordion = () => {
    const [expanded, setExpanded] = useState(-1);
    const [events, setEvents] = useState([]);
    const [eventsLoaded, setEventsLoaded] = useState(false);
    const [routines, setRoutines] = useState([]);
    const [routinesLoaded, setRoutinesLoaded] = useState(false);
    const [showAddition, setShowAddition] = useState(false);

    const handleChange = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const loadData = () => {
        get_events().then((_events) => {
            setEvents(_events);
            setEventsLoaded(true);
        });
        get_routines().then((_routines) => {
            setRoutines(_routines);
            setRoutinesLoaded(true);
        });
    }

    const generateUpdateCallback = (event) => () => {
        update_event(event)
            .then(loadData);
    }

    const generateDeleteCallback = (event) => () => {
        delete_event(event.ID)
            .then(() => {
                loadData();
                setExpanded(-1);
            });
    }

    const generateRunCallback = (event) => () => {
        run_event(event.ID);
    }

    const addEventCallback = (name) => {
        create_event({
            name,
            routines: [],
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
        if ('1234567890'.includes(event.key)) {
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

    let event_rows = [];

    if (routinesLoaded && eventsLoaded) {
        event_rows = events.map((event, index) => (
            <Accordion expanded={expanded === index} onChange={handleChange(index)} key={index}>
                <AccordionSummary>
                    <Typography fontWeight='bold'>{event.name}</Typography>
                    <Typography paddingLeft={1} color='rgba(0, 0, 0, .3)'>ID: {event.ID}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EventContents
                        routine_sequence={event.routines}
                        routines={routines}
                        update={generateUpdateCallback(event)}
                        _delete={generateDeleteCallback(event)}
                        run={generateRunCallback(event)}
                    />
                </AccordionDetails>
            </Accordion>
        ));

        if (showAddition) event_rows.push((
            <EventAddition key='html is cringe' add={addEventCallback} cancel={() => setShowAddition(false)} />
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
            {event_rows}
        </Box>
    );
}

export default EventAccordion;
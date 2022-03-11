import { useEffect, useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { get_routines, get_schedules, update_schedule, delete_schedule, create_schedule } from '../../api/move-data';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ScheduleContents from './schedule-contents';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ScheduleAddition from './schedule-addition';
import cronstrue from 'cronstrue';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderTop: 0,
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

const ScheduleAccordion = () => {
    const [expanded, setExpanded] = useState(-1);
    const [schedules, setSchedules] = useState([]);
    const [schedulesLoaded, setSchedulesLoaded] = useState(false);
    const [routines, setRoutines] = useState([]);
    const [routinesLoaded, setRoutinesLoaded] = useState(false);
    const [showAddition, setShowAddition] = useState(false);

    const handleChange = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const loadData = () => {
        get_schedules().then((_schedules) => {
            setSchedules(_schedules);
            setSchedulesLoaded(true);
        });
        get_routines().then((_routines) => {
            setRoutines(_routines);
            setRoutinesLoaded(true);
        });
    }

    const generateUpdateCallback = (schedule) => () => {
        update_schedule(schedule)
            .then(loadData);
    }

    const generateUpdateCronCallback = (schedule) => (new_cron) => {
        schedule.cron_string = new_cron;
        update_schedule(schedule)
            .then(loadData);
    }

    const generateDeleteCallback = (schedule) => () => {
        delete_schedule(schedule.ID)
            .then(() => {
                loadData();
                setExpanded(-1);
            });
    }

    const addScheduleCallback = (name) => {
        create_schedule({
            name,
            cron_string: "* * * * * *",
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

    let schedule_rows = [];

    if (routinesLoaded && schedulesLoaded) {
        schedule_rows = schedules.map((schedule, index) => (
            <Accordion expanded={expanded === index} onChange={handleChange(index)} key={index}>
                <AccordionSummary>
                    <Typography fontWeight='bold'>{schedule.name}</Typography>
                    <Typography paddingLeft={1}>({cronstrue.toString(schedule.cron_string)})</Typography>
                    <Typography paddingLeft={1} color='rgba(0, 0, 0, .3)'>ID: {schedule.ID}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ScheduleContents
                        routine_sequence={schedule.routines}
                        routines={routines}
                        update={generateUpdateCallback(schedule)}
                        _delete={generateDeleteCallback(schedule)}
                        updateCron={generateUpdateCronCallback(schedule)}
                        cron_string={schedule.cron_string}
                    />
                </AccordionDetails>
            </Accordion>
        ));

        if (showAddition) schedule_rows.push((
            <ScheduleAddition key='html is cringe' add={addScheduleCallback} cancel={() => setShowAddition(false)} />
        ))

    }

    return (
        <Box sx={{borderTop: '1px solid rgba(0, 0, 0, .125)'}}>
            <IconButton color='inherit' onClick={() => { setShowAddition(true) }} style={{ //amazing hack here
                position: 'absolute',
                top: 2,
                right: 8,
            }} >
                <AddCircleIcon fontSize='large' />
            </IconButton>
            {schedule_rows}
        </Box>
    );
}

export default ScheduleAccordion;
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ListItem } from '@mui/material';
import { Grid } from '@mui/material';

const RoutineControlPanel = (props) => {

    const { _delete, run, add } = props;

    return (
        <ListItem
            key='control panel'
        >
            <Grid container direction='row' justifyContent='flex-start' padding={0}>
                <Button onClick={add} variant='outlined' color='inherit' startIcon={<AddCircleOutlineIcon />} style={{marginRight: 5}}>
                    Action
                </Button>
                <Button onClick={run} variant='outlined' color='inherit' startIcon={<PlayCircleOutlineIcon />} style={{marginRight: 5}}>
                    Run
                </Button>
                <Button onClick={_delete} variant='outlined' color='inherit' startIcon={<DeleteIcon />} style={{marginRight: 5}}>
                    Delete
                </Button>
            </Grid>
        </ListItem>)
}

export default RoutineControlPanel;
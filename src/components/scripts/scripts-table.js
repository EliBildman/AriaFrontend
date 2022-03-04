import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { get_scripts, delete_script, run_script, upload_script } from '../../api/move-data';

const ScriptTable = () => {

    const [scripts, setScripts] = useState([]);

    const loadData = () => {
        get_scripts()
            .then(setScripts)
    }

    const generateDeleteCallback = (script) => () => {
        delete_script(script.ID)
            .then(loadData);
    }

    const handleSubmit = (event) => {
        const file = event.target.files[0];
        upload_script(file)
            .then(loadData);
    }

    useEffect(loadData, []);

    return (
        <Box borderTop={1} borderColor='rgba(0, 0, 0, 0.125)'>
            <TableContainer style={{ width: 'auto', paddingLeft: '15%', paddingRight: '15%' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scripts.map((script) => (
                            <TableRow
                                key={script.ID}
                            >
                                <TableCell component="th" scope="row">
                                    <Grid container direction='row'>
                                        <IconButton onClick={generateDeleteCallback(script)} color='inherit' style={{ paddingTop: 0, paddingBottom: 0 }} >
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                        <Typography>{script.file_name}</Typography>
                                        <Typography color='rgba(0, 0, 0, .3)' paddingLeft={1}>ID: {script.ID}</Typography>
                                    </Grid>
                                </TableCell>
                                <TableCell align="right">{script.type}</TableCell>
                                <TableCell align="right">{script.size}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box padding={1} >
                    <Button variant='outlined' component="label">
                        Upload
                        <input type='file' name='file' hidden onChange={handleSubmit} />
                    </Button>
                </Box>
            </TableContainer>

        </Box>
    );
}

export default ScriptTable;
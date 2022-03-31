import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ListItem, TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { isValidCron } from "cron-validator";

const ScheduleControlPanel = (props) => {
  const [error, setError] = useState(false);
  const { _delete, add, updateCron, cron_string } = props;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.target.blur();
  };

  const handleBlur = (event) => {
    const cron_str = event.target.value;
    if (isValidCron(cron_str, { seconds: true })) {
      updateCron(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <ListItem key="control panel">
      <Grid container direction="row" justifyContent="flex-start" padding={0}>
        <Button
          onClick={add}
          variant="outlined"
          color="inherit"
          startIcon={<AddCircleOutlineIcon />}
          style={{ marginRight: 5 }}
        >
          Routine
        </Button>
        <Button
          onClick={_delete}
          variant="outlined"
          color="inherit"
          startIcon={<DeleteIcon />}
          style={{ marginRight: 5 }}
        >
          Delete
        </Button>
        <TextField
          label="Cron String"
          size="small"
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          defaultValue={cron_string}
          error={error}
        />
      </Grid>
    </ListItem>
  );
};

export default ScheduleControlPanel;

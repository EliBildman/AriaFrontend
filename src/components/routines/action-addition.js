import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import Autocomplete from "@mui/material/Autocomplete";

const ActionAddition = (props) => {
  const { _delete, actions, add } = props;

  const handleChange = (_, value) => {
    add(value.name);
  };

  const action_options = actions.map((action) => {
    return { label: action.name, name: action.name };
  });

  return (
    <ListItem
      key={"addition"}
      sx={{
        borderTop: "lightGray solid 1px",
        padding: 2,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <IconButton
            onClick={_delete}
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <Autocomplete
            autoHighlight
            disablePortal
            id="combo-box-demo"
            options={action_options}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField autoFocus {...params} label="ADD ACTION" />
            )}
            size="small"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ActionAddition;

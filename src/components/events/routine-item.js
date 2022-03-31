import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";

const RoutineItem = (props) => {
  const { name, _delete, moveUp, moveDown } = props;

  return (
    <ListItem
      key={name}
      sx={{
        borderTop: "lightGray solid 1px",
        padding: 1,
        paddingLeft: 2,
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
            color="inherit"
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <Typography>{name}</Typography>
          <Grid
            container
            item
            direction="column"
            width="fit-content"
            paddingLeft={0}
          >
            <IconButton
              onClick={moveUp}
              style={{ paddingTop: 0, paddingBottom: 0 }}
            >
              <ArrowDropUpIcon />
            </IconButton>
            <IconButton
              onClick={moveDown}
              style={{ paddingTop: 0, paddingBottom: 0 }}
            >
              <ArrowDropDownIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default RoutineItem;

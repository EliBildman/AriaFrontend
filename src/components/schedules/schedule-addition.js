import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const ScheduleAddition = (props) => {
  const { add, cancel } = props;

  const handleKeyDown = (schedule) => {
    if (schedule.key === "Enter") {
      add(schedule.target.value);
    }
  };

  return (
    <Box
      key="new-schedule"
      style={{
        backgroundColor: "rgba(0, 0, 0, .03)",
        borderTop: "1px solid rgba(0, 0, 0, .125)",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
      }}
      width="100%"
    >
      <TextField
        label="NAME"
        size="small"
        autoFocus
        onBlur={cancel}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};

export default ScheduleAddition;

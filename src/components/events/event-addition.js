import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const EventAddition = (props) => {
  const { add, cancel } = props;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      add(event.target.value);
    }
  };

  return (
    <Box
      key="new-event"
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

export default EventAddition;

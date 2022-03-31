import { Box, Tabs, Tab, Typography, Grid } from "@mui/material";
import { useEffect, useState, useCallback } from "react";

const PageSlider = (props) => {
  const { children, labels } = props;

  const [index, setIndex] = useState(0);
  const handleChange = (_, newValue) => {
    setIndex(newValue);
  };

  const tabs = labels.map((label) => <Tab label={label} key={label} />);
  const component = children[index];

  const handleKeyPress = useCallback(
    (event) => {
      // handle keybinds
      if (event.target.nodeName !== "INPUT") {
        if (event.key === "ArrowRight") {
          if (index < labels.length - 1) setIndex(index + 1);
        }
        if (event.key === "ArrowLeft") {
          if (index > 0) setIndex(index - 1);
        }
      }
    },
    [index, labels.length]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Box>
      <Box>
        <Grid container direction="row" alignItems="flex-end">
          <Box paddingX={2}>
            <Typography variant="h3" fontFamily="Roboto">
              ARIA
            </Typography>
          </Box>
          <Tabs
            value={index}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabs}
          </Tabs>
        </Grid>
      </Box>
      {component}
    </Box>
  );
};

export default PageSlider;

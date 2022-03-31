import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import { types, get_param_info } from "../../api/action-param-types";
import {
  BoolInput,
  ChoiceInput,
  NumberInput,
  StringInput,
} from "./input-feilds";

const ParamCell = (props) => {
  const { info, saved_params, setUnsaved, update, autofocus } = props;

  const [currValue, setCurrValue] = useState(saved_params[info.name]);

  useEffect(() => {
    setCurrValue(saved_params[info.name]);
  }, [saved_params, info]);

  const handleUpdate = (value) => {
    if (info.type !== types.bool && !value) {
      delete saved_params[info.name];
    } else {
      if (info.type === types.number) value = parseFloat(value);
      saved_params[info.name] = value;
      setCurrValue(value);
      // currValue = value;
    }
    setUnsaved(true);
    update();
  };

  if (info.type === types.string) {
    // console.log(currValue);
    return <StringInput {...props} />;
  } else if (info.type === types.number) {
    return <NumberInput {...props} />;
  } else if (info.type === types.bool) {
    return <BoolInput {...props} />;
  } else if (info.type === types.options) {
    return <ChoiceInput {...props} />;
  } else {
    return <div></div>;
  }
};

const InputOutput = (props) => {
  const { info, output } = props;

  let type_label = "";

  if (info.type === types.number) type_label = "number";
  if (info.type === types.string) type_label = "string";
  if (info.type === types.bool) type_label = "bool";

  if (info.is_list) {
    type_label += "[]";
  }

  return (
    <Grid
      container
      direction={output ? "row-reverse" : "row"}
      justifyContent={output ? "flex-end" : "flex-start"}
      alignItems="center"
    >
      <Grid container item direction="column" width="fit-content">
        <Typography lineHeight={1} textAlign="center">
          {info.name}
        </Typography>
        <Typography
          lineHeight={1}
          variant="caption"
          textAlign="center"
          color="gray"
        >
          {type_label}
        </Typography>
      </Grid>
      <Grid item>
        <ArrowRightAltIcon fontSize="large" />
      </Grid>
    </Grid>
  );
};

const ActionItem = (props) => {
  const {
    name,
    param_outline,
    saved_params,
    update,
    _delete,
    moveUp,
    moveDown,
    index,
  } = props;

  const inputs = [];
  const outputs = [];
  const param_infos = [];

  for (let param_key in param_outline) {
    const info = get_param_info(param_key, param_outline[param_key]);
    if (info.is_input) {
      inputs.push(info);
    } else if (info.is_output) {
      outputs.push(info);
    } else {
      param_infos.push(info);
    }
  }

  const vaildateFilled = () => {
    for (let info of param_infos) {
      if (!info.is_optional && saved_params[info.name] === undefined) {
        return false;
      }
    }
    return true;
  };

  const [unsaved, setUnsaved] = useState(!vaildateFilled());

  const handleUpdate = () => {
    if (!vaildateFilled()) return;
    setUnsaved(false);
    update();
  };

  const input_cells = inputs.map((info, ind) => (
    <Grid item key={"i" + ind}>
      <InputOutput info={info} />
    </Grid>
  ));

  const param_cells = param_infos.map((info, ind) => (
    <Grid item key={ind} style={{ paddingTop: 0, paddingBottom: 0 }}>
      <ParamCell
        autofocus={ind === 0}
        info={info}
        saved_params={saved_params}
        update={handleUpdate}
        setUnsaved={setUnsaved}
      />
    </Grid>
  ));

  const output_cells = outputs.map((info, ind) => (
    <Grid item key={"o" + ind}>
      <InputOutput info={info} output />
    </Grid>
  ));

  return (
    <ListItem
      key={index}
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
          xs={3}
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
          <Typography>{name + (unsaved ? "*" : "")}</Typography>
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
              <ArrowDropUpIcon size="small" />
            </IconButton>
            <IconButton
              onClick={moveDown}
              style={{ paddingTop: 0, paddingBottom: 0 }}
            >
              <ArrowDropDownIcon size="small" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          xs={2}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {input_cells}
        </Grid>
        <Grid
          item
          xs={5}
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {param_cells}
        </Grid>
        <Grid
          item
          xs={2}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          {output_cells}
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ActionItem;

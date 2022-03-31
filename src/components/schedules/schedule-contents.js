import { useState, useEffect, useCallback } from "react";
import RoutineItem from "./routine-item";
import ScheduleControlPanel from "./schedule-control-panel";
import List from "@mui/material/List";
import RoutineAddition from "./routine-addition";

const ScheduleContents = (props) => {
  const {
    routine_sequence,
    routines,
    update,
    updateCron,
    _delete,
    cron_string,
  } = props;

  const [showAddition, setShowAddition] = useState(false);

  const handleAddRoutine = (ID) => {
    routine_sequence.push({ ID });
    setShowAddition(false);
    update();
  };

  const renderRoutines = () => {
    const generateMoveCallback = (index, dir) => () => {
      const swp = (i, j) => {
        const tmp = routine_sequence[i];
        routine_sequence[i] = routine_sequence[j];
        routine_sequence[j] = tmp;
      };
      if (dir === "up") {
        if (index !== 0) {
          swp(index, index - 1);
        }
      } else {
        if (index !== routine_sequence.length - 1) {
          swp(index, index + 1);
        }
      }
      update();
    };

    const generateDeleteRoutineCallback = (index) => () => {
      routine_sequence.splice(index, 1); //remove this routine from the sequence
      update();
    };

    return routine_sequence.map((seq_routine, index) => {
      const name = routines.find((r) => r.ID === seq_routine.ID).name;
      return (
        <RoutineItem
          key={index}
          name={name}
          _delete={generateDeleteRoutineCallback(index)}
          moveUp={generateMoveCallback(index, "up")}
          moveDown={generateMoveCallback(index, "down")}
        />
      );
    });
  };

  let routine_items = renderRoutines();

  const handleKeyPress = useCallback((schedule) => {
    // handle keybinds
    if (schedule.key === "r" && schedule.ctrlKey) {
      setShowAddition(true);
    }
    if (schedule.key === "Escape") {
      setShowAddition(false);
    }
    if (schedule.key === "Enter") {
      schedule.target.blur();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <List style={{ padding: 0 }}>
      <ScheduleControlPanel
        cron_string={cron_string}
        updateCron={updateCron}
        _delete={_delete}
        add={() => {
          setShowAddition(true);
        }}
      />
      {routine_items}
      {showAddition ? (
        <RoutineAddition
          add={handleAddRoutine}
          routines={routines}
          _delete={() => {
            setShowAddition(false);
          }}
        />
      ) : (
        <></>
      )}
    </List>
  );
};

export default ScheduleContents;

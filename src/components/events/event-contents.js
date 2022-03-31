import { useState, useEffect, useCallback } from "react";
import RoutineItem from "./routine-item";
import EventControlPanel from "./event-control-panel";
import List from "@mui/material/List";
import RoutineAddition from "./routine-addition";

const EventContents = (props) => {
  const { routine_sequence, routines, update, _delete, run, permenant } = props;

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

  const handleKeyPress = useCallback((event) => {
    // handle keybinds
    if (event.key === "r" && event.ctrlKey) {
      setShowAddition(true);
    }
    if (event.key === "Escape") {
      setShowAddition(false);
    }
    if (event.key === "Enter") {
      event.target.blur();
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
      <EventControlPanel
        permenant={permenant}
        _delete={_delete}
        run={run}
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

export default EventContents;

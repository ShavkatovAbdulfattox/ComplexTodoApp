import React, { useState } from "react";
import s from "./task.module.scss";

import { RiDeleteBinLine } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { useSelector } from "react-redux";

function Tasks({ boardID, tasks, index }) {
  let board = useSelector((state) => state.board.boards);
  board = board[0].board;

  const [isTaskEditing, setIsTaskEditing] = useState(false);
  const [taskEditingValue, setTaskEditingValue] = useState("");
  const dispatch = useDispatch();

  const { removeTaskFn, editTaskFn } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const removeTask = (taskId) => {
    if (taskId) {
      if (board.tasks && board.tasks.hasOwnProperty(taskId)) {
        delete board.tasks[taskId];
        removeTaskFn(board.tasks, taskId, boardID);
      }
    } else {
      throw new Error("ID is not correct  ");
    }
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (id) {
      // setting board value to the editing mode

      console.log(board.tasks[id].content);
      // setTaskEditingValue()

      // const editedTask = (board.tasks[id].content = taskEditingValue);
      // console.log(editedTask);
      // editTaskFn(editedTask);
      //setting editMode to false
      setIsTaskEditing(false);
    }

    // editTaskFn
  };
  return (
    <div>
      {isTaskEditing ? (
        <form onSubmit={(e) => handleSubmit(e, tasks.id)}>
          <input
            type="text"
            autoFocus
            value={taskEditingValue}
            onChange={(e) => setTaskEditingValue(e.target.value)}
            className={s.wrapper_input}
          />
        </form>
      ) : (
        <Draggable draggableId={tasks.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={s.wrapper_title}
              onDoubleClick={() => setIsTaskEditing(true)}
            >
              {tasks.content}
              <button onClick={() => removeTask(tasks.id)}>
                <RiDeleteBinLine />
              </button>
            </div>
          )}
        </Draggable>
      )}
    </div>
  );
}

export default Tasks;

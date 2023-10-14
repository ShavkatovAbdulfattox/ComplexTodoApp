import React from "react";
import s from "./task.module.scss";

import { RiDeleteBinLine } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

function Tasks({ board, boardID, tasks, index }) {
  const dispatch = useDispatch();

  const { removeTaskFn } = bindActionCreators(actionCreators, dispatch);

  const removeTask = (taskId) => {
    if (boardID) {
      if (board.tasks && board.tasks.hasOwnProperty(taskId)) {
        delete board.tasks[taskId];
      }
      console.log(board.tasks);
    }
    // removeTaskFn(taskId, boardID);
  };

  return (
    <div>
      <Draggable draggableId={tasks.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={s.wrapper_title}
            // style={{
            //   backgroundColor: snapshot.isDragging ? "lightgreen" : "",
            // }}
          >
            {tasks.content}
            <button onClick={() => removeTask(tasks.id)}>
              <RiDeleteBinLine />
            </button>
          </div>
        )}
      </Draggable>
    </div>
  );
}

export default Tasks;

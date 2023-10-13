import React from "react";
import s from "./task.module.scss";

import { RiDeleteBinLine } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";

function Tasks({ tasks, index }) {
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
            <button>
              <RiDeleteBinLine />
            </button>
          </div>
        )}
      </Draggable>
    </div>
  );
}

export default Tasks;

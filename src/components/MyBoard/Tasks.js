import React from "react";
import s from "./task.module.scss";

import useToggle from "../hook/useToggle";
import { RiDeleteBinLine } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";

function Tasks({ tasks, index }) {
  // console.log(tasks.id);
  return (
    <>
      <Draggable draggableId={tasks.id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={s.wrapper_title}
              style={{
                backgroundColor:
                  snapshot.isDragging && snapshot.isDragging
                    ? "lightblue"
                    : "white",
                // Add other styles as needed
              }}
            >
              {tasks.content}
              <button>
                <RiDeleteBinLine />
              </button>
            </div>
          );
        }}
      </Draggable>
    </>
  );
}

export default Tasks;

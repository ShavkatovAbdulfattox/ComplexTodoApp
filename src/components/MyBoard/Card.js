import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import plus from "../../assets/images/plus.svg";

import s from "./style.module.scss";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { actionCreators } from "../../state";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

function Card({ board, boardID, card, tasks, index }) {
  const dispatch = useDispatch();

  const { addNewTaskTitle } = bindActionCreators(actionCreators, dispatch);

  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [textCardValue, setCardTextValue] = useState("");

  const onAddNewTaskTitle = (e, cardID) => {
    e.preventDefault();

    const newTask = {
      id: "task-" + uuidv4(),
      content: textCardValue,
    };
    // * adding New
    addNewTaskTitle(newTask, cardID, boardID);

    // * close text card
    setIsAddingNewTask(false);

    // * set value to null
    setCardTextValue("");
  };

  useEffect(() => {
    if (!isAddingNewTask && !textCardValue) return;
    const handleEnterKeyPressed = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevent newline in textarea
        onAddNewTaskTitle(e, card.id);
      }
    };

    document.addEventListener("keydown", handleEnterKeyPressed);

    return () => {
      document.removeEventListener("keydown", handleEnterKeyPressed);
    };
  }, [textCardValue]);

  return (
    <div className={s.wrapper_container}>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              id={card.id}
              className={s.list_wrapper}
            >
              <div
                className={s.list_wrapper__header}
                {...provided.dragHandleProps}
              >
                <h3>{card.title}</h3>
              </div>{" "}
              <Droppable droppableId={card.id} type="task">
                {(provided, snapshot) => {
                  return (
                    <>
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={s.taskList}
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? "lightgreen"
                            : "",
                          minHeight: snapshot.isDraggingOver ? "52px" : "",
                        }}
                      >
                        {tasks.map((task, index) => {
                          if (task && task.id) {
                            return (
                              <Tasks
                                key={task.id}
                                board={board}
                                boardID={boardID}
                                tasks={task}
                                index={index}
                              />
                            );
                          } else {
                            // Handle the case where the task is undefined or doesn't have an 'id'
                            return null;
                          }
                        })}
                      </div>
                      {provided.placeholder}{" "}
                      {/* Include the placeholder here */}
                    </>
                  );
                }}
              </Droppable>
            </div>
          );
        }}
      </Draggable>

      <div className={s.list_wrapper__actionContainer}>
        {!isAddingNewTask && (
          <motion.div
            className={s.list_wrapper__action}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddingNewTask(true)}
          >
            <p>
              {" "}
              <span>
                <img src={plus} alt="plus" />
              </span>{" "}
              Add a card
            </p>
          </motion.div>
        )}
        {isAddingNewTask && (
          <form
            className={s.wrapper_text__card}
            onSubmit={(e) => onAddNewTaskTitle(e, card.id)}
          >
            <textarea
              name="text_area"
              value={textCardValue}
              onChange={(e) => setCardTextValue(e.target.value)}
              placeholder="Enter title for this card"
            />
            <div>
              <button>Add card</button>
              <AiOutlineClose onClick={() => setIsAddingNewTask(false)} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Card;

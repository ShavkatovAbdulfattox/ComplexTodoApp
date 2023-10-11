import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import plus from "../../assets/images/plus.svg";

import s from "./style.module.scss";
import { useSelector } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

function Card({ boards, boardID, card, tasks, index, addNewTaskTitle }) {
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [textCardValue, setCardTextValue] = useState("");
  const onAddNewTaskTitle = (e) => {
    e.preventDefault();

    const textCardObj = {
      id: boardID,
      value: textCardValue,
      newID: uuidv4(),
    };
    console.log(textCardObj);
    // * adding New
    addNewTaskTitle(textCardObj);

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
        onAddNewTaskTitle(e);
      }
    };

    document.addEventListener("keydown", handleEnterKeyPressed);

    return () => {
      document.removeEventListener("keydown", handleEnterKeyPressed);
    };
  }, [textCardValue]);

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={s.list_wrapper}
            id={card.id}
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
                        className={s.taskList}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? "red"
                            : "white",
                          // Add other styles as needed
                        }}
                      >
                        {tasks.map((tasks, index) => {
                          return (
                            <Tasks key={tasks.id} tasks={tasks} index={index} />
                          );
                        })}
                      </div>
                      {provided.placeholder}
                    </>
                  );
                }}
              </Droppable>{" "}
           
            {!isAddingNewTask && (
              <motion.div
                className={s.list_wrapper__action}
                whileTap={{ scale: 0.9 }}
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
                onSubmit={onAddNewTaskTitle}
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
        );
      }}
    </Draggable>
  );
}

export default Card;
{
  /* // ! Tasks */
}
{
  /* {boardTaskTitle?.tasks?.length >= 0 && (
    <Tasks boardTaskTitle={boardTaskTitle} />
  )} */
}
{
  /* {!isOpenTextCard && (
      <motion.div
        className={s.list_wrapper__action}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpenTextCard(true)}
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
    */
}

import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Form, useParams } from "react-router-dom";

import s from "./style.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";

function MyBoard() {
  const { nameAndId } = useParams();
  const { boards } = useSelector((state) => state.board);

  const dispatch = useDispatch();

  const { addNewTaskTitle } = bindActionCreators(actionCreators, dispatch);

  const [textCardValue, setCardTextValue] = useState("");
  const [isOpenTextCard, setIsOpenTextCard] = useState(false);

  useEffect(() => {
    if (!isOpenTextCard && !textCardValue) return;
    const handleEnterKeyPressed = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevent newline in textarea
        handleSubmit(e);
      }
    };

    document.addEventListener("keydown", handleEnterKeyPressed);

    return () => {
      document.removeEventListener("keydown", handleEnterKeyPressed);
    };
  }, [textCardValue]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const textCardObj = {
      id: nameAndId,
      value: textCardValue,
      newID: uuidv4(),
    };
    console.log(textCardObj);
    // adding New
    addNewTaskTitle(textCardObj);

    // close text card
    setIsOpenTextCard(false);

    // set value to null
    setCardTextValue("");
  };

  const boardTaskTitle = boards.find((board) => board.id === nameAndId);

  return (
    <div className={s.wrapper}>
      <h2>Page with tasks</h2>

      {/* // ! Drag and drop context  */}
      <DragDropContext>
        {/* // **  Droppable * */}

        <Droppable droppableId="all-cards" direction="horizontal" type="card">
          {(provided) => {
            console.log(provided);
            return (
              <section
                className={s.wrapper_content}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {console.log(provided.placeholder)}
                {/* // ! Card */}
                <Card
                  boardTaskTitle={boardTaskTitle}
                  setIsOpenTextCard={setIsOpenTextCard}
                  isOpenTextCard={isOpenTextCard}
                  textCardValue={textCardValue}
                  setCardTextValue={setCardTextValue}
                  handleSubmit={handleSubmit}
                />
                {provided.placeholder}
              </section>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default MyBoard;

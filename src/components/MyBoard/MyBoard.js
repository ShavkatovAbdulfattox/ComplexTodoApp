import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import {  useParams } from "react-router-dom";

import s from "./style.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import Card from "./Card";

function MyBoard() {
  const { nameAndId } = useParams();
  const { boards } = useSelector((state) => state.board);

  const dispatch = useDispatch();

  const { addNewTaskTitle } = bindActionCreators(actionCreators, dispatch);

  const [textCardValue, setCardTextValue] = useState("");

  const { board } = boards.find((item) => item.board.id === nameAndId);
  console.log(board);
  return (
    <div className={s.wrapper}>
      <h2>Page with tasks</h2>

      {/* // ! Drag and drop context  */}
      <DragDropContext>
        {/* // **  Droppable * */}

        <Droppable droppableId="all-cards" direction="horizontal" type="card">
          {(provided) => {
            // console.log(provided);
            return (
              <section
                className={s.wrapper_content}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {board.cardOrder.map((id, index) => {
                  const card = board.cards[id];
                  console.log(card.taskIds);
                  const cardTask = card.taskIds.map(
                    (taskIds) => board.tasks[taskIds]
                  );
                  console.log(cardTask);
                  return (
                    <Card
                      key={card.id}
                      card={card}
                      tasks={cardTask}
                      index={index}
                      boards={boards}
                      boardID={nameAndId}
                      textCardValue={textCardValue}
                      setCardTextValue={setCardTextValue}
                      addNewTaskTitle={addNewTaskTitle}
                    />
                  );
                })}
                {/* // ! Card */}

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

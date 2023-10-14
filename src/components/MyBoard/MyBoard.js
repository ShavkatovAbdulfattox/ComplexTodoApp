import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { useParams } from "react-router-dom";

import s from "./style.module.scss";

import { useSelector } from "react-redux";

import Card from "./Card";
import { ITEM_TYPES } from "../../utils/constants";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { useDispatch } from "react-redux";

function MyBoard() {
  const { nameAndId } = useParams();
  const { boards } = useSelector((state) => state.board);

  const { board } = boards.find((item) => item.board.id === nameAndId);
  console.log(board);
  const dispatch = useDispatch();

  const { reorderCardsFn, moveTaskFn, reorderTaskFn } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // ! Fn for Drag and Drop

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (type === ITEM_TYPES.CARD) {
      reorderCards(source, destination, draggableId);
    } else {
      // Start this is takes the ID from where we will take
      const start = board.cards[source.droppableId];
      // Finish this will return the id of when we will put
      const finish = board.cards[destination.droppableId];
      if (start.id === finish.id) {
        reorderTasksWithCard(
          start,
          source.index,
          destination.index,
          draggableId
        );
      } else {
        moveTask(start, finish, source.index, destination.index, draggableId);
      }
    }
  };

  function reorderCards(source, destination, draggableId) {
    const newCardOrder = Array.from(board.cardOrder);
    newCardOrder.splice(source.index, 1);
    console.log("!", newCardOrder);
    newCardOrder.splice(destination.index, 0, draggableId);
    console.log("2", newCardOrder);
    reorderCardsFn(newCardOrder, board.id);
  }

  function reorderTasksWithCard(card, sourceIdx, destinationIdx, draggableId) {
    const newTaskIds = Array.from(card.taskIds);
    newTaskIds.splice(sourceIdx, 1);
    newTaskIds.splice(destinationIdx, 0, draggableId);

    reorderTaskFn({ card, newTaskIds }, board.id);
  }

  function moveTask(start, finish, sourceId, destinationId, draggableId) {
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(sourceId, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    // console.log("newStrart",newStart);
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destinationId, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    moveTaskFn({ newStart, newFinish }, board.id);
  }

  return (
    <div className={s.wrapper}>
      <h2>Page with tasks</h2>

      {/* // ! Drag and drop context  */}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* // **  Droppable * */}
        <Droppable droppableId="all-cards" direction="horizontal" type="card">
          {(provided) => {
            return (
              <section
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={s.wrapper_content}
              >
                {board.cardOrder.map((id, index) => {
                  const card = board.cards[id];

                  const cardTask = card.taskIds.map(
                    (taskIds) => board.tasks[taskIds]
                  );
                  {
                    /* // ! Card */
                  }
                  return (
                    <Card
                      key={card.id}
                      card={card}
                      tasks={cardTask}
                      index={index}
                      boardID={nameAndId}
                      board={board}
                    />
                  );
                })}

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

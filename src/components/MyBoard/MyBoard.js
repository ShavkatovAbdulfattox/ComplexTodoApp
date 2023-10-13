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

  const dispatch = useDispatch();

  const { reorderCardsFn } = bindActionCreators(actionCreators, dispatch);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    // Check if the draggable item was dropped outside a valid drop target
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

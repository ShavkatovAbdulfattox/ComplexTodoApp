import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { useParams } from "react-router-dom";

import s from "./style.module.scss";

import { useSelector } from "react-redux";

import Card from "./Card";

function MyBoard() {
  const { nameAndId } = useParams();
  const { boards } = useSelector((state) => state.board);
  console.log(boards);

  const { board } = boards.find((item) => item.board.id === nameAndId);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log(result);
    // Check if the draggable item was dropped outside a valid drop target
    if (!destination) {
      return;
    }

    // Implement logic to reorder cards or tasks based on the source and destination indices
    // Update the state to reflect the new order.
  };

  // Call onDragEnd when a drag-and-drop operation occurs within the DragDropContext.

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
                className={s.wrapper_content}
                {...provided.droppableProps}
                ref={provided.innerRef}
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
                      boards={boards}
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

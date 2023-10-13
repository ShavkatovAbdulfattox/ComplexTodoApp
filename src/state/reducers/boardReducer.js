import { getFromLocalStorage } from "../../helpers/localStorage.helper";

const initialState = {
  boards: getFromLocalStorage("boards") ? getFromLocalStorage("boards") : [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CREATE_BOARD":
      const newBoard = { board: payload };
      return {
        ...state,
        boards: [...state.boards, newBoard],
      };
    case "ADD_NEW_TITLE":
      const { newTaskTitle, cardID, id } = payload;
      // const { board } = state.boards.find(({ board }) => board.id === id);

      return {
        ...state,
        boards: state.boards.map(({ board }) => {
          if (board.id === id) {
            // Find the board with the specified ID
            const updatedBoard = {
              ...board,
              cards: {
                ...board.cards,
                [cardID]: {
                  ...board.cards[cardID],
                  taskIds: [...board.cards[cardID].taskIds, newTaskTitle.id],
                },
              },
              tasks: {
                ...board.tasks,
                [newTaskTitle.id]: newTaskTitle,
              },
            };

            return { board: updatedBoard };
          } else {
            return board;
          }
        }),
      };
    case "REORDER_CARDS":
      const { newOrder, id: boardID } = payload;
      return {
        ...state,
        boards: state.boards.map((boardInfo) => {
          console.log(boardID);
          if (boardInfo.board.id === boardID) {
            console.log(true);
            const updatedBoard = {
              ...boardInfo.board,
              cardOrder: newOrder,
            };
            console.log(updatedBoard);
            return { board: updatedBoard };
          }
          return boardInfo;
        }),
      };

    default:
      return state;
  }
};

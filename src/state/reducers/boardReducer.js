import { getFromLocalStorage } from "../../helpers/localStorage.helper";

const initialState = { boards: getFromLocalStorage("boards") ?? [] };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CREATE_BOARD":
      return {
        ...state,
        boards: [...state.boards, payload],
      };
    case "ADD_NEW_TITLE":
      const updatedBoard = state.boards.map((el) => {
        if (el.id === payload.id) {
          const updatedEl = {
            ...el,
            title: payload.value,
          };
          console.log("Updated Element:", updatedEl);
          return updatedEl;
        }
        return el;
      });
      return {
        ...state,
        boards: updatedBoard,
      };

    default:
      return state;
  }
};

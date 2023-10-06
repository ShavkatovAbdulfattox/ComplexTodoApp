import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../helpers/localStorage.helper";

export const createBoard = (obj) => {
  return (dispatch) => {
    const existingBoards = getFromLocalStorage("boards") || [];

    existingBoards.push(obj);

    // Update the modified array back into localStorage

    setToLocalStorage("boards", existingBoards);

    dispatch({
      type: "CREATE_BOARD",
      payload: obj,
    });
  };
};

import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../helpers/localStorage.helper";

export const createBoard = (obj) => {
  return (dispatch) => {
    // Get existing boards from local storage
    const existingBoards = getFromLocalStorage("boards") || [];

    // // Add the new board to the existing boards
    // existingBoards.push(...existingBoards, { board: obj });
    existingBoards.push({ board: obj });
    // Update the modified array back into localStorage
    setToLocalStorage("boards", existingBoards);
    console.log(existingBoards);
    // Dispatch the action to update the Redux store
    dispatch({
      type: "CREATE_BOARD",
      payload: obj,
    });
  };
};

export const addNewTaskTitle = (newTaskTitle, cardID, id) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_NEW_TITLE",
      payload: { newTaskTitle, cardID, id },
    });
  };
};

export const reorderCardsFn = (newOrder, id) => {
  return (dispatch) => {
    dispatch({
      type: "REORDER_CARDS",
      payload: { newOrder, id },
      // payload: { dragInfo, id },
    });
  };
};

export const moveTaskFn = (startAndFinish, id) => {
  return (dispatch) => {
    dispatch({
      type: "MOVE_TASK",
      payload: { startAndFinish, id },
    });
  };
};

export const reorderTaskFn = (reorderTask, id) => {
  return (dispatch) => {
    dispatch({
      type: "REORDER_TASK",
      payload: { reorderTask, id },
    });
  };
};
export const removeTaskFn = (boardTasks, taskId, id) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_TASK",
      payload: { boardTasks, taskId, id },
    });
  };
};

export const editTaskFn = (value, taskId, id) => {
  return (dispatch) => {
    dispatch({
      type: "EDIT_TASK",
      payload: { value, taskId, id },
    });
  };
};

export const createBoard = (obj) => {
  return (dispatch) => {
    dispatch({
      type: "CREATE_BOARD",
      payload: obj,
    });
  };
};

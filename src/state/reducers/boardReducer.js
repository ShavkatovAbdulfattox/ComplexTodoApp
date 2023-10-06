const initialState = { boards: [] };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CREATE_BOARD":
      return {
        ...state,
        boards: [...state.boards, payload],
      };

    default:
      return state;
  }
};

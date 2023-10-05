const initialState = { amount: 0 };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "deposit":
      return state.amount + payload;

    default:
      return state;
  }
};

import { getFromLocalStorage } from "../../helpers/localStorage.helper";

const initialState = { boards: getFromLocalStorage("boards") ?? [] };

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

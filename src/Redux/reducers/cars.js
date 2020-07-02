import { SET_CARS, EDIT_FILTERS } from "../actions/types";

const initialState = {
  items: [],
  filters: {
    liked: false,
    keyword: "",
  },
};

const carsReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_CARS:
      return { ...state, items: payload };
    case EDIT_FILTERS:
      return { ...state, filters: payload };
    default:
      return state;
  }
};

export default carsReducer;

import { SET_CARS, EDIT_FILTERS, LIKE_CAR } from "../actions/types";

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
    case LIKE_CAR:
      return {
        ...state,
        items: state.items.map((car) =>
          car.Id === payload ? { ...car, Liked: !car.Liked } : car
        ),
      };
    default:
      return state;
  }
};

export default carsReducer;

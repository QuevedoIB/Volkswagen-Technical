import { SET_CARS, EDIT_FILTERS, LIKE_CAR } from "./types";

export const setCars = (payload) => ({
  type: SET_CARS,
  payload,
});

export const editFilters = (payload) => ({
  type: EDIT_FILTERS,
  payload,
});

export const likeCar = (payload) => ({
  type: LIKE_CAR,
  payload,
});

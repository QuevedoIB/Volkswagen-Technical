import { SET_CARS, EDIT_FILTERS } from "./types";

export const setCars = (payload) => ({
  type: SET_CARS,
  payload,
});

export const editFilters = (payload) => ({
  type: EDIT_FILTERS,
  payload,
});

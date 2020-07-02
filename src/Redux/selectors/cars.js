import { createSelector } from "reselect";

const getCarsItems = (state) => state.cars.items;
const getCarsFilters = (state) => state.cars.filters;

export const getFilteredCars = createSelector(
  [getCarsFilters, getCarsItems],
  (filters, cars) =>
    cars.filter(
      (car) =>
        car.Brand.includes(filters.keyword) && car.Liked === filters.liked
    )
);

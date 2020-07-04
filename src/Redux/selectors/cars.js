import { createSelector } from "reselect";

const getCarsItems = (state) => state.cars.items;
const getCarsFilters = (state) => state.cars.filters;

export const getFilteredCars = createSelector(
  [getCarsFilters, getCarsItems],
  (filters, cars) =>
    filters.liked
      ? cars.filter(
          (car) =>
            car.Brand.toLowerCase().includes(filters.keyword.toLowerCase()) &&
            car.Liked
        )
      : cars.filter((car) =>
          car.Brand.toLowerCase().includes(filters.keyword.toLowerCase())
        )
);

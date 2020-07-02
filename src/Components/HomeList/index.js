import React from "react";

import CarCard from "Components/common/CarCard";

const HomeList = ({ list }) => {
  //list has to render part of array check if there are more items and in scroll render more array elements
  //index , pagination
  return list.map((e) => {
    return <CarCard key={e.Id} car={e} />;
  });
};

export default HomeList;

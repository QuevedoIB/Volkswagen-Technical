import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "Redux/actions/cars";
import * as selectors from "Redux/selectors/cars";
import carsService from "Services/carsService";

import HomeHeader from "Components/HomeHeader";

const Home = ({ cars, setCars }) => {
  const { data: carsResponse, status, error } = useQuery(
    "cars",
    carsService.getCars
  );
  useEffect(() => {
    console.log("CALLED QUERY", carsResponse);
    if (carsResponse) {
      setCars(carsResponse);
    }
  }, [carsResponse, setCars]);

  console.log(cars, "CARS REDUX");
  return (
    <div>
      <HomeHeader />
      {cars.map((e) => {
        return <p>{e.Id}</p>;
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cars: selectors.getFilteredCars(state),
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

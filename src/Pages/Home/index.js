import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ClipLoader from "react-spinners/ClipLoader";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import * as actions from "Redux/actions/cars";
import * as selectors from "Redux/selectors/cars";
import carsService from "Services/carsService";

import HomeHeader from "Components/HomeHeader";
import HomeList from "Components/HomeList";

const StyledHomeWrapper = styled.div`
  padding: ${({ theme: { defaultPadding } }) => defaultPadding}px;
`;

const Home = ({ cars, setCars }) => {
  const { data: carsResponse, status, error } = useQuery(
    "cars",
    carsService.getCars
  );
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    if (carsResponse) {
      setCars(carsResponse);
    }
  }, [carsResponse, setCars]);

  if (error) {
    alert("An error occurred, try reloading the page");
    return <ClipLoader />;
  }

  return (
    <StyledHomeWrapper>
      <HomeHeader amount={cars.length} />
      {status === "success" ? (
        <HomeList list={cars} />
      ) : (
        <ClipLoader size={isMobile ? 35 : 60} />
      )}
    </StyledHomeWrapper>
  );
};

const mapStateToProps = (state) => ({
  cars: selectors.getFilteredCars(state),
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

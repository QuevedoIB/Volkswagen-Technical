import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CarCard from "Components/common/CarCard";

const StyledListContainer = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30vw, 1fr));
  max-width: 100%;

  list-style-type: none;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const HomeList = ({ list, filters }) => {
  const [index, setIndex] = useState(3); //base items to render;
  const listRef = useRef();
  const listToRender = list.slice(0, index);

  useEffect(() => {
    setIndex(3);
  }, [filters]);

  const onEndListReached = useCallback(() => {
    const nextIndex = index + 3;
    const itemsLeft = list.length - nextIndex;

    if (itemsLeft >= 3) {
      return setIndex(nextIndex);
    } else if (itemsLeft <= 3 && itemsLeft >= 0) {
      setIndex(list.length);
    }
  }, [list, index]);

  const handleScroll = useCallback(() => {
    //50px from bottom to trigger the load more items handler
    const distanceFromBottomToFetch = 50;

    const endListReached =
      listRef.current.getBoundingClientRect().bottom <=
      window.innerHeight + distanceFromBottomToFetch;
    if (endListReached) {
      onEndListReached();
    }

    if (index === list.length) {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [onEndListReached, index, list.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  console.log("rerender", listToRender);

  return (
    <StyledListContainer ref={listRef}>
      {listToRender.map((e) => {
        return <CarCard key={e.Id} car={e} />;
      })}
    </StyledListContainer>
  );
};

HomeList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Image: PropTypes.string,
      Brand: PropTypes.string,
      Model: PropTypes.string,
      CV: PropTypes.number,
      Energy: PropTypes.string,
      Plate: PropTypes.string,
      Kms: PropTypes.number,
      RegistrationDate: PropTypes.string,
      Liked: PropTypes.bool,
    })
  ).isRequired,
  filters: PropTypes.shape({
    keyword: PropTypes.string,
    liked: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = ({ cars: { filters } }) => ({
  filters,
});

export default memo(connect(mapStateToProps)(HomeList));

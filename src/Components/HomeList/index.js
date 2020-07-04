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

const HomeList = ({ list, filters, amountToRender = 3 }) => {
  const [index, setIndex] = useState(amountToRender); //base items to render;
  const listRef = useRef();
  const listToRender = list.slice(0, index);

  useEffect(() => {
    setIndex(amountToRender);
  }, [filters, amountToRender]);

  const onEndListReached = useCallback(() => {
    const itemsLeft = list.length - index;
    if (itemsLeft >= amountToRender) {
      return setIndex((index) => index + amountToRender);
    } else if (itemsLeft < amountToRender && itemsLeft > 0) {
      setIndex(list.length);
    }
  }, [list, amountToRender, index]);

  useEffect(() => {
    const listFillScreen = () => {
      if (
        listRef.current.getBoundingClientRect().height <= window.innerHeight
      ) {
        onEndListReached();
      }
    };
    listFillScreen();
  }, [onEndListReached, amountToRender, index, list.length]);

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

  const renderListContent = useCallback(
    () =>
      listToRender.map((e) => {
        return <CarCard key={e.Id} car={e} />;
      }),
    [listToRender]
  );

  return (
    <StyledListContainer ref={listRef}>
      {renderListContent()}
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
  amountToRender: PropTypes.number,
};

const mapStateToProps = ({ cars: { filters } }) => ({
  filters,
});

export default memo(connect(mapStateToProps)(HomeList));

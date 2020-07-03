import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import styled from "styled-components";

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

const HomeList = ({ list }) => {
  const [index, setIndex] = useState(3); //base items to render;
  const listRef = useRef();
  const listToRender = list.slice(0, index);

  useEffect(() => {
    setIndex(3);
  }, [list]);

  const onEndListReached = useCallback(() => {
    const nextIndex = index + 3;
    const itemsLeft = list.length - nextIndex;

    console.log(nextIndex, itemsLeft);

    if (itemsLeft >= 3) {
      return setIndex(nextIndex);
    } else if (itemsLeft <= 3 && itemsLeft >= 0) {
      setIndex(list.length);
    }
  }, [list, index]);

  const handleScroll = useCallback(() => {
    console.log("SCROLLING");
    const endListReached =
      listRef.current.getBoundingClientRect().bottom <= window.innerHeight + 50; //50px from bottom
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

export default memo(HomeList);

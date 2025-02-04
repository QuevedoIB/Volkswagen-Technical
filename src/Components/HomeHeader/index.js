import React, { useCallback } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

import * as actions from "Redux/actions/cars";

import HomeTitle from "Components/HomeTitle";

const StyledHeaderContainer = styled.div`
  max-width: 100%;
  max-height: 40px;
  display: flex;
  justify-content: space-between;
  margin: ${({ theme }) => theme.defaultMargin}px 0;
`;

const StyledInput = styled.input`
  ${({ theme }) => {
    return `color: ${theme.primaryBlue};
    border: 1px solid ${theme.primaryBlue};
    font-family: ${theme.primaryFont};
    `;
  }}
  height: 40px;
  padding: 0px 20px;

  @media (min-width: 1200px) {
    width: 20vw;
    font-size: 1.2rem;
  }
`;

const StyledButton = styled.button`
  ${({ theme }) => {
    return `color: ${theme.primaryBlue};
    border: 1px solid ${theme.primaryBlue};
    font-family: ${theme.primaryFont};
    `;
  }}
  background-color: white;
  cursor: pointer;
  height: 42px;
  width: 100px;

  @media (min-width: 1200px) {
    width: 10vw;
    font-size: 1.2rem;
  }

  @media (max-width: 600px) {
    width: 60px;
  }
`;

const StyledButtonContentContainer = styled.span`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
`;

const HomeHeader = ({ editFilters, filters: { keyword, liked }, amount }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const onChangeKeyword = useCallback(
    ({ target: { value } }) => {
      editFilters({
        keyword: value,
        liked,
      });
    },
    [editFilters, liked]
  );
  const onFavoritesPress = useCallback(
    () => editFilters({ keyword, liked: !liked }),
    [editFilters, keyword, liked]
  );

  return (
    <>
      <HomeTitle amount={amount} />
      <StyledHeaderContainer>
        <StyledInput
          value={keyword}
          placeholder="Buscar Marca"
          onChange={onChangeKeyword}
        />
        <StyledButton>
          <StyledButtonContentContainer
            data-testid="like-button"
            onClick={onFavoritesPress}
          >
            {!isMobile && "Favoritos"}
            {liked ? (
              <FaHeart data-testid="liked-icon" />
            ) : (
              <FaRegHeart data-testid="disliked-icon" />
            )}
          </StyledButtonContentContainer>
        </StyledButton>
      </StyledHeaderContainer>
    </>
  );
};

HomeHeader.propTypes = {
  editFilters: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    keyword: PropTypes.string,
    liked: PropTypes.bool,
  }).isRequired,
  amount: PropTypes.number.isRequired,
};

const mapStateToProps = ({ cars: { filters } }) => ({
  filters,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);

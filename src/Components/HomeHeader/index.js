import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import * as actions from "Redux/actions/cars";

import HomeTitle from "Components/HomeTitle";

const StyledHeaderContainer = styled.div`
  max-width: 100%;
  max-height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 10px 40px;
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
  height: 40px;
  width: 100px;
`;

const StyledButtonContentContainer = styled.span`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
`;

const HomeHeader = ({ editFilters, filters: { keyword, liked } }) => {
  console.log("RERENDER HEADER");
  const onChangeKeyword = ({ target: { value } }) => {
    editFilters({
      keyword: value,
      liked,
    });
  };
  const onFavouritesPress = () => editFilters({ keyword, liked: !liked });
  return (
    <>
      <HomeTitle amount={0} />
      <StyledHeaderContainer>
        <StyledInput
          value={keyword}
          placeholder="Buscar Marca"
          onChange={onChangeKeyword}
        />
        <StyledButton>
          <StyledButtonContentContainer onClick={onFavouritesPress}>
            Favoritos
            {liked ? <FaHeart /> : <FaRegHeart />}
          </StyledButtonContentContainer>
        </StyledButton>
      </StyledHeaderContainer>
    </>
  );
};

const mapStateToProps = ({ cars: { filters } }) => ({
  filters,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);

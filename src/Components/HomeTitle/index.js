import React, { memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTitle = styled.h3`
  display: inline-block;
  background-color: ${({ theme }) => theme.primaryBlue};
  color: #fff;
  padding: 7px 21px;
  @media (min-width: 721px) {
    font-size: 2.66667rem;
  }
`;

const HomeTitle = ({ amount }) => {
  if (!amount)
    return <StyledTitle>No hemos encontrado ninguna coincidencia</StyledTitle>;

  return (
    <StyledTitle>
      Hemos encontrado{" "}
      {amount > 1 ? `${amount} vehículos para ti` : "un vehículo para ti"}
    </StyledTitle>
  );
};

HomeTitle.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default memo(HomeTitle);

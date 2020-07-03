import React, { useCallback, memo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FaHeart, FaRegHeart, FaMapMarkerAlt } from "react-icons/fa";
import styled from "styled-components";
import PropTypes from "prop-types";

import * as actions from "Redux/actions/cars";

const StyledCardContainer = styled.li`
  display: inline-block;
  margin: auto;
  height: auto;
  width: 30vw;

  @media (max-width: 720px) {
    width: 35vw;
  }

  @media (max-width: 480px) {
    width: 90vw;
  }
`;

const StyledCarImage = styled.img`
  height: 30%;
  width: 100%;
`;

const StyledCardTitles = styled.p`
  ${({ theme }) => `
  color: ${theme.primaryBlue};
  font-family: ${theme.primaryFont};
  `}
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "14px")};
  font-weight: ${({ fontWeight }) => (fontWeight ? `${fontWeight}` : "400")};

  @media (min-width: 1200px) {
    font-size: ${({ fontSize }) => (fontSize ? `1.2rem` : "1.6rem")};
  }
`;

const StyledLikeButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.primaryBlue};
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.primaryBlue};
  }
`;

const StyledCardHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledCardDetails = styled.p`
  color: gray;
  font-size: 12px;
  font-family: ${({ theme }) => theme.primaryFont};
  @media (min-width: 1200px) {
    font-size: 1rem;
  }
`;

const StyledLocationContainer = styled(StyledCardHeaderContainer)`
  justify-content: flex-start;
  svg,
  p {
    color: ${({ theme }) => theme.primaryBlue};
  }

  p {
    font-family: ${({ theme }) => theme.primaryFont};
    margin-left: 6px;
  }

  @media (min-width: 1200px) {
    font-size: 1.2rem;
  }
`;

const StyledCarDetailsContainer = styled.div`
  padding: 8px;
`;

// Car item missing: Location, Automatico/Manual, Liked (injected in api call)
// {
//     "Id": "001",
//     "Brand": "VW",
//     "CO2": "118",
//     "CV": 184,
//     "Energy": "DIESEL",
//     "Likes": 6,
//     "Kms": 39853,
//     "Model": "Polo",
//     "Image": "https://media.volkswagen.com/vw-AW1-my2020/iris?COSY-EU-100-1713VV%25lXm0kYNazzSU9mu0fO7Az6yyJ1vTvsd2SMppEKhjTtKSK8CPk1MM8H2Lvyr0Q%25UOVggAa5hP4KYwqeQeOOnH%25yyJ8H3WDZ4HvCJii8meZGoo0gZrnZlO4O6bLKKFNMbTggAcEvvFHOu5ZxxHlZkPF%25uAnW07ZZU8pVfRD%25xIIrsJYUP01bCCtBvyrXAhLLyH0kYbAwh88WTU9j%25I4bBMdPAA2Zjeqz5qMZKMI7UbSK8C7g21bBzdDAONX3qjBrr9UOXs3OHqttOWEC55PH4w99deVCZZslwCiiI%25KrffQXTJ22UFF4nn4hwFuugk8V00zPgAFF3ZWSxxcv0aBBhV%25TTTklhSWWHnk3GGKu9pJJMXF8llvhFkEELsGjVVbgvyXXY6XGttOoGv55PdJw99d4X%25ZZsQt8iiIiuRffQfZr22UDMynn4Y5SuugkqI00zjj5FF3hiNxxcf32BBhgBiTTkwsrWWHrIvGGK0BqJJMH0Ullvtd4EEL5AHVVbSS%25XXYQ%257ttOGzP55PAnL99deDQZZsoQpiiIprSffQoIr22UjMYnn4hGquug5wL00zr7AFF3wSFxxc7FhBBhyPnTTko2JWWHuq0GGK6kaJJMFG1llvld0EEL4flVVbf5PXXYWq9ttOG3s55PfZw99dg8aZZsExJiiIJkLffQfKr22UtZvnn45fsuugz3q00z4KAFF3yMSxxcBwBBBhj%25%25TTkbTzWWHK7vGGKGHLJJM0GYllvzTYEELA4wVVbN9WXXYZz8ttOGav55P44a99dDFWZZsaekiiI0GyffQ84t22Uam6nn4nzOuugkBa00z14hFF3FHSxxcm3oBBhPBjTTkmRfWWHurLGGK46jJJMRI%25llvrSZEEL3eaVVbr5WXXYTDMttOkWv55P40o99dKXsZZsa8C&width=864",
//     "Plate": "1234ABC",
//     "RegistrationDate": "01-05-2015"
// }

const CarCard = ({
  car: {
    Id,
    Image,
    Brand,
    Model,
    CV,
    Energy,
    Plate,
    Kms,
    RegistrationDate,
    Liked,
  },
  likeCar,
}) => {
  //  Right way to do it, unable to because date format is DD/MM/YYYY
  //  const year = new Date(RegistrationDate).getFullYear();
  const year = RegistrationDate.slice(
    RegistrationDate.length - 4,
    RegistrationDate.length
  );

  const onLikePress = useCallback(() => {
    likeCar(Id);
  }, [Id, likeCar]);

  return (
    <StyledCardContainer>
      <StyledCarImage src={Image} alt="Car Model"></StyledCarImage>
      <StyledCarDetailsContainer>
        <StyledCardHeaderContainer>
          <div>
            <StyledCardTitles
              fontWeight={600}
            >{`${Brand} ${Model}`}</StyledCardTitles>
            <StyledCardTitles
              fontSize={12}
            >{`${Brand} ${Model} ${CV}CV`}</StyledCardTitles>
          </div>
          <StyledLikeButton onClick={onLikePress}>
            {Liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </StyledLikeButton>
        </StyledCardHeaderContainer>
        <StyledCardDetails>{`${Plate} | ${year} | ${Kms}km | ${CV}CV | ${Energy}`}</StyledCardDetails>
        <StyledLocationContainer>
          <FaMapMarkerAlt /> <p>Barcelona</p>
        </StyledLocationContainer>
      </StyledCarDetailsContainer>
    </StyledCardContainer>
  );
};

CarCard.propTypes = {
  car: PropTypes.shape({
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
  }).isRequired,
  likeCar: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
});

export default memo(connect(null, mapDispatchToProps)(CarCard));

import React, { useCallback, memo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import * as actions from "Redux/actions/cars";

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
    //edit redux cars and like the car that matches id
    likeCar(Id);
  }, []);

  return (
    <div>
      <img src={Image} alt="Car Model"></img>
      <div>
        <div>
          <p>{`${Brand} ${Model}`}</p>
          <p>{`${Brand} ${Model} ${CV}CV`}</p>
        </div>
        <button onClick={onLikePress}>
          {Liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <p>{`${Plate} | ${year} | ${Kms}km | ${CV}CV | ${Energy}`}</p>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
});

export default memo(connect(null, mapDispatchToProps)(CarCard));

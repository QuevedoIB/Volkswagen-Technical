import React, { memo } from "react";
import PropTypes from "prop-types";

const HomeTitle = ({ amount }) => {
  if (!amount) return <h3>No hemos encontrado ninguna coincidencia</h3>;

  return (
    <h3>
      Hemos encontrado{" "}
      {amount > 1 ? `${amount} vehículos para ti` : "un vehículo para ti"}
    </h3>
  );
};

HomeTitle.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default memo(HomeTitle);

import React, { memo } from "react";

const HomeTitle = ({ amount }) => {
  if (!amount) return <h3>No hemos encontrado ninguna coincidencia</h3>;

  return (
    <h3>
      Hemos encontrado{" "}
      {amount > 1 ? `${amount} vehículos para ti` : "un vehículo para ti"}
    </h3>
  );
};

export default memo(HomeTitle);

import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import images from "Assets/Navbar";

const StyledNav = styled.nav`
  background: rgba(255, 255, 255, 0.6);
  height: 68px;
  margin: 0 0 68px;
  padding: 0 40px;

  @media (max-width: 720px) {
    height: 48px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

const StyledImage = styled.img`
  height: 108px;
  width: 180px;

  @media (max-width: 720px) {
    width: 170px;
    height: 48px;
  }
`;

const Navbar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const logoSrc = isMobile ? images.mobile : images.desktop;
  return (
    <StyledNav>
      <StyledImage
        src={logoSrc}
        alt="Volkswagen Financial Services - The Key To Mobility"
      />
    </StyledNav>
  );
};

export default Navbar;

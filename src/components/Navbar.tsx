import React from "react";
import styled from "styled-components";
import Login from "./Login";
import Register from "./Register";

const Navbar = () => {
  const Navbar = styled.nav`
    width: 60vw;
    background-color: red;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
  `;
  const LogoTitle = styled.h1``;
  const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `;

  return (
    <Navbar>
      <LogoTitle>Auction</LogoTitle>
      <Wrapper>
        <Login />
        <Register />
      </Wrapper>
    </Navbar>
  );
};

export default Navbar;
